#![no_std]

extern crate alloc;

use gstd::{debug, errors::Result, exec, msg, prelude::*, ActorId, MessageId};
use designer_io::*;
use alloc::collections::btree_map::Entry;

// define designer contract version
// ver = 1, impl basic contract create, sign, index function
const DESIGNER_VER: u64 = 1;

#[derive(Default)]
pub struct DeSigner {
    version: u64,
    owner: ActorId,
    index: u64,
    contract_map: BTreeMap<u64, Contract>,
    contract_map_by_creator: BTreeMap<ActorId, Vec<u64>>,
    contract_map_by_signer: BTreeMap<ActorId, Vec<u64>>,
}

impl DeSigner {
    pub fn set_owner(&mut self, owner: ActorId) {
        self.owner = owner;
    }

    pub fn create_contract(
        &mut self,
        name: String,
        signers: Vec<ActorId>,
        res: ResourceParam,
        expire: u64,
        send_reply: bool,
    ) -> u64 {
        self.validate_great_than_block_timestamp(expire);
        self.validate_str(&name);
        self.validate_str(&res.url);
        self.validate_opt_str(res.memo.as_ref());

        let id = self.next_id();

        let creator = msg::source();
        let file = Resource {
            digest: res.digest.clone(),
            url: res.url,
            memo: res.memo,
            cate: ResourceCate::MainFile,
            creator,
            creat_at: exec::block_timestamp(),
        };
        if self.contract_map.contains_key(&id) {
            panic!("wrong id");
        }
        self.contract_map_by_creator
            .entry(creator)
            .or_insert(vec![])
            .push(id);
        for signer in signers.iter() {
            self.contract_map_by_signer
                .entry(*signer)
                .or_insert(vec![])
                .push(id);
        }
        self.contract_map.insert(
            id,
            Contract {
                id,
                creator,
                creat_tx: msg::id(),
                name: name.clone(),
                create_at: exec::block_timestamp(),
                expire,
                status: ContractStatus::Created,
                signers,
                agree_on: Default::default(),
                file,
                other_res: Default::default(),
            },
        );
        if send_reply {
            msg::reply(
                DeSignerEvent::CreateContract {
                    id,
                    name,
                    creator,
                    digest: res.digest,
                },
                0,
            )
                .unwrap();
        }
        id
    }

    pub fn create_contract_with_agree(
        &mut self,
        name: String,
        signers: Vec<ActorId>,
        file: ResourceParam,
        expire: u64,
        resource: Option<ResourceParam>,
    ) {
        let id = self.create_contract(name, signers, file, expire, false);
        self.agree_on_contract(id, resource);
    }

    pub fn upload_attachment(&mut self, id: u64, res: ResourceParam) {
        self.validate_str(&res.url);
        self.validate_opt_str(res.memo.as_ref());
        self.validate_contract_status(id, ContractStatus::Created);
        self.validate_contract_expire(id);
        self.validate_contract_singer(id);

        let contract = match self.contract_map.entry(id) {
            Entry::Occupied(entry) => entry.into_mut(),
            Entry::Vacant(_) => panic!("not found contract"),
        };

        let sender = msg::source();
        if !contract.signers.contains(&sender) {
            panic!("not found signer")
        }
        let attachment = Resource {
            digest: res.digest.clone(),
            url: res.url,
            memo: res.memo,
            cate: ResourceCate::Attachment,
            creator: sender,
            creat_at: exec::block_timestamp(),
        };
        contract
            .other_res
            .entry(sender)
            .or_insert(vec![])
            .push(attachment);
        msg::reply(
            DeSignerEvent::UploadMetadata {
                id,
                creator: sender,
                digest: res.digest,
                cate: ResourceCate::Attachment,
            },
            0,
        )
            .unwrap();
    }

    pub fn upload_metadata(&mut self, id: u64, res: ResourceParam) {
        self.validate_str(&res.url);
        self.validate_opt_str(res.memo.as_ref());
        self.validate_contract_status(id, ContractStatus::Created);
        self.validate_contract_expire(id);
        self.validate_contract_singer(id);

        let contract = match self.contract_map.entry(id) {
            Entry::Occupied(entry) => entry.into_mut(),
            Entry::Vacant(_) => panic!("not found contract"),
        };
        let sender = msg::source();
        let metadata = Resource {
            digest: res.digest.clone(),
            url: res.url,
            memo: res.memo,
            cate: ResourceCate::FileMetadata,
            creator: sender,
            creat_at: exec::block_timestamp(),
        };
        contract
            .other_res
            .entry(sender)
            .or_insert(vec![])
            .push(metadata);
        msg::reply(
            DeSignerEvent::UploadMetadata {
                id,
                creator: sender,
                digest: res.digest,
                cate: ResourceCate::FileMetadata,
            },
            0,
        )
            .unwrap();
    }

    pub fn agree_on_contract(&mut self, id: u64, res: Option<ResourceParam>) {
        if let Some(resource) = res.as_ref() {
            self.validate_str(&resource.url);
            self.validate_opt_str(resource.memo.as_ref());
        }
        self.validate_contract_expire(id);
        self.validate_contract_singer(id);
        let contract = match self.contract_map.entry(id) {
            Entry::Occupied(entry) => entry.into_mut(),
            Entry::Vacant(_) => panic!("not found contract"),
        };

        // trigger signing when start sign
        if contract.status == ContractStatus::Created {
            contract.status = ContractStatus::Signing;
        }
        if contract.status != ContractStatus::Signing {
            panic!("not in correct status")
        }

        let sender = msg::source();
        if let Some(resource) = res {
            let metadata = Resource {
                digest: resource.digest.clone(),
                url: resource.url,
                memo: resource.memo,
                cate: ResourceCate::SignMetadata,
                creator: sender,
                creat_at: exec::block_timestamp(),
            };
            contract
                .other_res
                .entry(sender)
                .or_insert(vec![])
                .push(metadata);
        }

        if contract.agree_on.contains_key(&sender) {
            panic!("duplicated sign")
        }
        contract.agree_on.insert(
            sender,
            AgreeOnInfo {
                msg_id: msg::id(),
                create_at: exec::block_timestamp(),
            },
        );

        // if agree_on count equal to signers, trigger finished
        if contract.agree_on.len() == contract.signers.len() {
            contract.status = ContractStatus::Sealed;
        }

        msg::reply(DeSignerEvent::AgreeOnContract { id, signer: sender }, 0).unwrap();
    }

    pub fn abrogate_contract(&mut self, id: u64, res: ResourceParam) {
        self.validate_str(&res.url);
        self.validate_opt_str(res.memo.as_ref());
        self.validate_contract_expire(id);
        self.validate_contract_singer(id);

        let contract = match self.contract_map.entry(id) {
            Entry::Occupied(entry) => entry.into_mut(),
            Entry::Vacant(_) => panic!("not found contract"),
        };
        if contract.status != ContractStatus::Created && contract.status != ContractStatus::Signing
        {
            panic!("not in correct status")
        }
        let sender = msg::source();
        contract.status = ContractStatus::Abrogated;
        let resource = Resource {
            digest: res.digest.clone(),
            url: res.url,
            memo: res.memo,
            cate: ResourceCate::AbrogateMetadata,
            creator: sender,
            creat_at: exec::block_timestamp(),
        };
        contract
            .other_res
            .entry(sender)
            .or_insert(vec![])
            .push(resource);

        msg::reply(DeSignerEvent::AbrogateContract { id, sender }, 0).unwrap();
    }

    pub fn transfer_owner(&mut self, owner: ActorId) {
        self.validate_only_owner();
        let old = self.owner;
        self.set_owner(owner);
        msg::reply(DeSignerEvent::TransferOwner { old, new: owner }, 0).unwrap();
    }

    fn next_id(&mut self) -> u64 {
        let (_, of) = self.index.overflowing_add(1);
        if of {
            panic!("index overflow")
        }

        let next = self.index;
        self.index += 1;
        next
    }

    fn validate_great_than_block_timestamp(&self, t: u64) {
        if t <= exec::block_timestamp() {
            panic!("input time too low")
        }
    }

    fn validate_str(&self, s: &String) {
        if s.len() > 512 {
            panic!("too much chars")
        }
        if s.trim().len() != s.len() {
            panic!("has whitespace in prefix or suffix")
        }
    }

    fn validate_opt_str(&self, s: Option<&String>) {
        match s {
            None => {}
            Some(s) => self.validate_str(s),
        }
    }

    fn validate_only_owner(&self) {
        if msg::source() != self.owner {
            panic!("Only owner can call it")
        }
    }

    fn validate_contract_status(&self, id: u64, status: ContractStatus) {
        let contract = self.contract_map.get(&id).expect("not found contract");
        if contract.status != status {
            panic!("not in correct status")
        }
    }

    fn validate_contract_expire(&self, id: u64) {
        let contract = self.contract_map.get(&id).expect("not found contract");
        if contract.expire <= exec::block_timestamp() {
            panic!("contract has expired")
        }
    }

    fn validate_contract_singer(&self, id: u64) {
        let contract = self.contract_map.get(&id).expect("not found contract");
        if !contract.signers.contains(&msg::source()) {
            panic!("not found signer")
        }
    }
}

static mut GLOBAL: Option<DeSigner> = None;

#[no_mangle]
extern "C" fn init() {
    let params: DeSignerInitParams = msg::load().expect("Unable to decode payload");
    debug!("init(): {:?}", params);

    let mut state = DeSigner::default();
    state.version = DESIGNER_VER;
    state.set_owner(params.owner);
    unsafe { GLOBAL = Some(state) };
}

#[gstd::async_main]
async unsafe fn main() {
    let action: DeSignerAction = msg::load().expect("Unable to decode payload");

    let ds: &mut DeSigner = unsafe { GLOBAL.as_mut().expect("globalState not init") };
    match action {
        DeSignerAction::CreateContract {
            name,
            signers,
            file,
            expire,
        } => {
            ds.create_contract(name, signers, file, expire, true);
        }
        DeSignerAction::CreateContractWithAgree {
            name,
            signers,
            file,
            expire,
            resource,
        } => ds.create_contract_with_agree(name, signers, file, expire, resource),
        DeSignerAction::UploadAttachment { id, attachment } => {
            ds.upload_attachment(id, attachment)
        }
        DeSignerAction::UploadResource { id, resource } => ds.upload_metadata(id, resource),
        DeSignerAction::AgreeOnContract { id, resource } => ds.agree_on_contract(id, resource),
        DeSignerAction::AbrogateContract { id, resource } => ds.abrogate_contract(id, resource),
        DeSignerAction::TransferOwner { owner } => ds.transfer_owner(owner),
    }
}

#[no_mangle]
extern "C" fn state() {
    let DeSigner {
        version,
        owner,
        index,
        contract_map,
        contract_map_by_creator,
        contract_map_by_signer,
    } = unsafe { GLOBAL.as_mut().expect("globalState not init") };

    let state = DeSignerState {
        version: *version,
        owner: *owner,
        index: *index,
        contract_map: contract_map.iter().map(|(k, v)| (*k, v.clone())).collect(),
        contract_map_by_creator: contract_map_by_creator.iter().map(|(k, v)| (*k, v.clone())).collect(),
        contract_map_by_signer: contract_map_by_signer.iter().map(|(k, v)| (*k, v.clone())).collect()
    };

    reply(state).expect(
        "Failed to encode or reply with `<ContractMetadata as Metadata>::State` from `state()`",
    );
}

#[no_mangle]
extern "C" fn metahash() {
    let metahash: [u8; 32] = include!("../.metahash");

    reply(metahash).expect("Failed to encode or reply with `[u8; 32]` from `metahash()`");
}

fn reply(payload: impl Encode) -> Result<MessageId> {
    msg::reply(payload, 0)
}
