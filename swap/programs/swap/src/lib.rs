pub mod constants;
pub mod error;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use instructions::*;
pub use state::*;

declare_id!("HGTjge35c9ZirjNE23i4WqEJoEdxvc7LzWvsHPJf9tD2");

#[program]
pub mod swap {
    use super::*;

    pub fn make_offer(context: Context<MakeOffer>) -> Result<()> 
    {
        insructions::make_offer::send_offered_tokens_to_vault()?'
        instructions::make_offer::save_offer(context)
    }
}

