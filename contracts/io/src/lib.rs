#![no_std]

use gmeta::{In, InOut, Metadata};
use gstd::{prelude::*, ActorId, MessageId};

pub struct ContractMetadata;

impl Metadata for ContractMetadata {
    type Init = In<DeSignerInitParams>;
    type Handle = InOut<DeSignerAction, DeSignerEvent>;
    type Reply = ();
    type Others = ();
    type Signal = ();
    type State = DeSignerState;
}

#[derive(Debug, Encode, Decode, TypeInfo, Hash, PartialEq, Eq, PartialOrd, Ord, Clone)]
pub enum ResourceCate {
    // main sign file, like xx.pdf
    MainFile,
    // other files
    Attachment,
    // metadata in file
    FileMetadata,
    // sign metadata, like digital sign in contract
    SignMetadata,
    // Abrogate metadata
    AbrogateMetadata,
}

#[derive(Debug, Encode, Decode, TypeInfo, Hash, PartialEq, Eq, PartialOrd, Ord, Clone)]
pub enum DigestAlgo {
    SHA256(String),
}

#[derive(Debug, Encode, Decode, TypeInfo, Hash, PartialEq, Eq, PartialOrd, Ord, Clone)]
pub struct ResourceParam {
    pub digest: DigestAlgo,
    pub url: String,
    pub memo: Option<String>,
}

#[derive(Debug, Encode, Decode, TypeInfo, Hash, PartialEq, Eq, PartialOrd, Ord, Clone)]
pub struct Resource {
    pub digest: DigestAlgo,
    pub url: String,
    pub memo: Option<String>,
    pub cate: ResourceCate,
    pub creator: ActorId,
    pub creat_at: u64,
}

#[derive(Debug, Encode, Decode, TypeInfo, Hash, PartialEq, Eq, PartialOrd, Ord, Clone)]
pub enum ContractStatus {
    Created,
    Signing,
    Sealed,
    Abrogated,
}

#[derive(Debug, Default, Encode, Decode, TypeInfo, Hash, PartialEq, Eq, PartialOrd, Ord, Clone)]
pub struct AgreeOnInfo {
    pub msg_id: MessageId,
    pub create_at: u64,
}

#[derive(Debug, Encode, Decode, TypeInfo, Hash, PartialEq, Eq, PartialOrd, Ord, Clone)]
pub struct Contract {
    pub id: u64,
    pub creator: ActorId,
    pub creat_tx: MessageId,
    pub name: String,
    pub create_at: u64,
    pub expire: u64,
    pub status: ContractStatus,
    pub signers: Vec<ActorId>,
    pub agree_on: BTreeMap<ActorId, AgreeOnInfo>,
    pub file: Resource,
    pub other_res: BTreeMap<ActorId, Vec<Resource>>,
}

#[derive(Debug, Default, Encode, Decode, TypeInfo, Hash, PartialEq, Eq, PartialOrd, Ord, Clone)]
pub struct DeSignerState {
    pub version: u64,
    pub owner: ActorId,
    pub index: u64,
    pub contract_map: BTreeMap<u64, Contract>,
    pub contract_map_by_creator: BTreeMap<ActorId, Vec<u64>>,
    pub contract_map_by_signer: BTreeMap<ActorId, Vec<u64>>,
}

#[derive(Debug, Encode, Decode, TypeInfo)]
pub enum DeSignerAction {
    CreateContract {
        name: String,
        signers: Vec<ActorId>,
        file: ResourceParam,
        expire: u64,
    },
    CreateContractWithAgree {
        name: String,
        signers: Vec<ActorId>,
        file: ResourceParam,
        resource: Option<ResourceParam>,
        expire: u64,
    },
    UploadAttachment {
        id: u64,
        attachment: ResourceParam,
    },
    UploadResource {
        id: u64,
        resource: ResourceParam,
    },
    AgreeOnContract {
        id: u64,
        resource: Option<ResourceParam>,
    },
    AbrogateContract {
        id: u64,
        resource: ResourceParam,
    },
    TransferOwner {
        owner: ActorId,
    },
}

#[derive(Debug, Encode, Decode, TypeInfo)]
pub enum DeSignerEvent {
    CreateContract {
        id: u64,
        name: String,
        creator: ActorId,
        digest: DigestAlgo,
    },
    UploadMetadata {
        id: u64,
        creator: ActorId,
        digest: DigestAlgo,
        cate: ResourceCate,
    },
    AgreeOnContract {
        id: u64,
        signer: ActorId,
    },
    AbrogateContract {
        id: u64,
        sender: ActorId,
    },
    TransferOwner {
        old: ActorId,
        new: ActorId,
    },
}

#[derive(Debug, Encode, Decode, TypeInfo)]
pub struct DeSignerInitParams {
    pub owner: ActorId,
}
