use anchor_lang::prelude::*;

declare_id!("9mywEXW8LWee1d9E46xQxqo4HtaLseZb7EHQJTDC3QUJ");

#[program]
pub mod first_solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.bump = ctx.bumps.counter;
        msg!("Counter account created! Current count: {}", counter.count);
        msg!("Bump is: {}",counter.bump );
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        msg!("Previous count was: {}", counter.count);

        counter.count = counter.count.checked_add(1).unwrap();
        msg!("Counter incremented! New count is: {}", counter.count);
        Ok(())
    }
}

#[account]
#[derive(InitSpace)]
pub struct Counter {
    pub count: u64,
    pub bump: u8,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
 
    #[account(init, seeds=[b"counter"], bump, payer=user, space = 8+Counter::INIT_SPACE)]
    pub counter: Account<'info, Counter>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut, seeds=[b"counter"], bump=counter.bump)]
    pub counter: Account<'info, Counter>,
}
