use anchor_lang::prelude::*;

declare_id!("DeFFFxVXY4DhBPFTKTphM86W2m1wCPXB9oCAPgP6Rf2E");

#[program]
pub mod anchor_marketplaace {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
