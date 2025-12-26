use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

pub mod context;
use context::*;

declare_id!("GvsDCy9b5iU957JfK8w2zgrSBU1q7CycGCT2jj4wAmLQ");

#[program]
pub mod nft_contract {
    use super::*;
    pub fn init_nft(_ctx: Context<InitNft>) -> Result<()> {
        Ok(())
    }
}