use gstd::{prelude::*, ActorId};
use designer_io::*;

#[derive(Debug, Default, Encode, Decode, TypeInfo, Hash, PartialEq, Eq, PartialOrd, Ord, Clone)]
pub struct PageParam {
    pub page_num: u64,
    pub page_size: u64,
    pub addr: ActorId,
    pub statuses: Vec<ContractStatus>,
}

impl PageParam {
    pub fn find_index(&self, total: u64) -> (u64, u64) {
        if self.page_size == 0 {
            panic!("wrong page_size")
        }

        let mut start = (self.page_num - 1) * self.page_size;
        if start >= total {
            start = total
        }

        let mut end = start + self.page_size;
        if end > total {
            end = total
        }

        (start, end)
    }
}

#[derive(Debug, Default, Encode, Decode, TypeInfo, Hash, PartialEq, Eq, PartialOrd, Ord, Clone)]
pub struct PageRet<T> {
    pub total: u64,
    pub pages: u64,
    pub page_num: u64,
    pub page_size: u64,
    pub data: Vec<T>,
}

impl<T> PageRet<T> {
    pub fn new(param: PageParam, total: u64, data: Vec<T>) -> Self {
        let mut pages = total / param.page_size;
        if total % param.page_size > 0 {
            pages += 1;
        }
        PageRet {
            total,
            pages,
            page_num: param.page_num,
            page_size: param.page_size,
            data,
        }
    }
}
