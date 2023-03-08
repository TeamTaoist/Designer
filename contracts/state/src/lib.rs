#![no_std]

use gmeta::{metawasm, Metadata};
use gstd::{prelude::*, ActorId};
use designer_io::*;
use crate::page::{PageParam, PageRet};

mod page;

#[metawasm]
pub trait Metawasm {
    type State = <ContractMetadata as Metadata>::State;

    fn owner(state: Self::State) -> ActorId {
        state.owner
    }

    fn index(state: Self::State) -> u64 {
        state.index
    }

    fn version(state: Self::State) -> u64 {
        state.version
    }

    fn query_contract_by_creator(param: PageParam, state: Self::State) -> PageRet<Contract> {
        if let Some(id_list) = state.contract_map_by_creator.get(&param.addr) {
            let total = id_list.len() as u64;
            let (start, end) = param.find_index(total);
            let mut res = Vec::with_capacity((end - start) as usize);
            for i in start..end {
                let contract = state
                    .contract_map
                    .get(&id_list[i as usize])
                    .expect("not found contract");
                res.push((*contract).clone())
            }
            PageRet::new(param, total, res)
        } else {
            PageRet::new(param, 0, Vec::new())
        }
    }

    fn query_contract_by_signer(param: PageParam, state: Self::State) -> PageRet<Contract> {
        if let Some(id_list) = state.contract_map_by_signer.get(&param.addr) {
            let total = id_list.len() as u64;
            let (start, end) = param.find_index(total);
            let mut res = Vec::with_capacity((end - start) as usize);
            for i in start..end {
                let contract = state
                    .contract_map
                    .get(&id_list[i as usize])
                    .expect("not found contract");
                res.push((*contract).clone())
            }
            PageRet::new(param, total, res)
        } else {
            PageRet::new(param, 0, Vec::new())
        }
    }
    fn query_contract_by_signer_and_status(
        param: PageParam, state: Self::State
    ) -> PageRet<Contract> {
        if let Some(id_list) = state.contract_map_by_signer.get(&param.addr) {
            let mut filter_list = Vec::with_capacity(id_list.len());
            for index in id_list.iter().copied() {
                let contract = state
                    .contract_map
                    .get(&index)
                    .expect("not found contract");
                if param.statuses.contains(&contract.status) {
                    filter_list.push(index);
                }
            }
            let total = filter_list.len() as u64;
            let (start, end) = param.find_index(total);
            let mut res = Vec::with_capacity((end - start) as usize);
            for i in start..end {
                let contract = state
                    .contract_map
                    .get(&filter_list[i as usize])
                    .expect("not found contract");
                res.push((*contract).clone())
            }
            PageRet::new(param, total, res)
        } else {
            PageRet::new(param, 0, Vec::new())
        }
    }

    fn query_contract_by_id(param: u64, state: Self::State) -> Contract {
        let contract = state.contract_map.get(&param).expect("not found contract");
        (*contract).clone()
    }

    fn query_all_contract_by_id(ids: Vec<u64>, state: Self::State) -> Vec<Contract> {
        let mut res = Vec::with_capacity(ids.len());
        for i in ids.iter() {
            let contract = state
                .contract_map
                .get(i)
                .expect("not found contract");
            res.push((*contract).clone())
        }
        res
    }

    fn query_all_contract_by_creator(addr: ActorId, state: Self::State) -> Vec<Contract> {
        if let Some(id_list) = state.contract_map_by_creator.get(&addr) {
            let mut res = Vec::with_capacity(id_list.len());
            for i in id_list.iter() {
                let contract = state
                    .contract_map
                    .get(i)
                    .expect("not found contract");
                res.push((*contract).clone())
            }
            res
        } else {
            Vec::new()
        }
    }
}

pub type PendingExecuted = (bool, bool);
pub type FromToPendingExecuted = (u32, u32, bool, bool);
