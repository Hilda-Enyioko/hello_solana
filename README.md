# Hello Solana 🌱

My first Solana program, built as part of the **[Solana Fall School 2026](https://github.com/solana-foundation)**.

This project is a hands-on introduction to building, testing, and interacting with a Solana program using **Rust, Anchor, JavaScript, and the Solana CLI**.

## What I Learned

Through this project, I explored some of the fundamental concepts behind Solana development:

* Setting up a Solana development environment with WSL
* Using the Solana CLI and managing wallets
* Running a local Solana validator
* Creating and deploying an Anchor program
* Understanding Solana accounts and program IDs
* Writing and calling program instructions
* Deriving Program Derived Addresses (PDAs)
* Understanding bumps and deterministic addresses
* Interacting with Solana programs using JavaScript
* Working with localnet and devnet

## Project Overview

The program is called `hello_solana` and currently exposes two instructions:

### `initialize`

Initializes the program's on-chain state.

### `increment`

Increments the stored counter/state.

The project follows an instruction-handler structure where the public program instructions delegate their implementation to separate handler modules.

```text
hello_solana/
├── programs/
│   └── hello_solana/
│       └── src/
│           ├── lib.rs
│           ├── constants.rs
│           ├── error.rs
│           ├── instructions/
│           │   ├── mod.rs
│           │   ├── initialize.rs
│           │   └── increment.rs
│           └── state/
│               ├── mod.rs
│               └── ...
├── tests/
├── pda.js
├── Anchor.toml
├── Cargo.toml
└── README.md
```

## Program Structure

The main program entry point is defined in:

```text
programs/hello_solana/src/lib.rs
```

The program exposes its instructions through Anchor:

```rust
#[program]
pub mod hello_solana {
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        crate::instructions::initialize::handle_initialize(ctx)
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        crate::instructions::increment::handle_increment(ctx)
    }
}
```

This keeps the program interface separate from the underlying instruction logic.

## Program ID

```text
HZgh2EK2QP3Ne347GNKTokNmJux5dMq8G9tvJ3T2yJ6G
```

The program ID uniquely identifies the Solana program.

It is declared in Rust using:

```rust
declare_id!("HZgh2EK2QP3Ne347GNKTokNmJux5dMq8G9tvJ3T2yJ6G");
```

## PDA Experiment

I also created a small JavaScript script to experiment with **Program Derived Addresses (PDAs)**.

```bash
node pda.js <PROGRAM_ID> counter
```

For example:

```bash
node pda.js HZgh2EK2QP3Ne347GNKTokNmJux5dMq8G9tvJ3T2yJ6G counter
```

The script derives a PDA from:

```text
program ID + seed
```

and prints:

* Program ID
* Seed
* PDA
* Bump

A PDA is deterministic, meaning the same program ID and seed will always produce the same address.

Deriving a PDA does **not** create an account on-chain. It only calculates an address. An account must still be created through a transaction.

## Local Development

The project was developed inside **Ubuntu on WSL2**.

The project is stored in the Linux filesystem:

```text
~/solana/hello_solana
```

rather than under `/mnt/c`, which helps avoid the filesystem performance issues that can occur when compiling Rust projects from the Windows filesystem.

For VS Code, the project can be opened directly from WSL:

```bash
cd ~/solana/hello_solana
code .
```

## Running a Local Validator

A Solana localnet can be started with:

```bash
solana-test-validator --reset
```

This creates a local blockchain running on the machine.

Then configure the CLI to use it:

```bash
solana config set --url localhost
```

Check the connection:

```bash
solana cluster-version
```

And check the wallet:

```bash
solana balance
```

Localnet SOL is free and exists only on the local blockchain. It has no value on devnet or mainnet.

## Building the Program

Build the Anchor program with:

```bash
anchor build
```

After the initial build, synchronize the generated program ID with the project:

```bash
anchor keys sync
anchor keys list
```

The ID reported by `anchor keys list` should match the ID declared in the program.

## Testing

Run the Anchor test suite with:

```bash
anchor test
```

Anchor can automatically start a local validator, deploy the program, run the tests, and shut the validator down afterward.

## Development Tools

The project uses:

| Tool       | Purpose                                                  |
| ---------- | -------------------------------------------------------- |
| Rust       | Writing the Solana program                               |
| Solana CLI | Managing wallets, clusters, transactions and deployments |
| Anchor     | Solana development framework                             |
| Node.js    | Running JavaScript/TypeScript client code                |
| JavaScript | Interacting with and experimenting with the program      |
| WSL2       | Linux development environment on Windows                 |
| VS Code    | Code editor                                              |

## A Note on My Development Environment

One of the biggest lessons from setting up this project was that the development environment itself can become part of the debugging process.

My original local validator failed because the WSL kernel was too old to support the `io_uring` capability required by the Solana validator.

The old kernel was:

```text
5.10.16.3-microsoft-standard-WSL2
```

After updating Windows and WSL, the kernel became:

```text
6.18.33.2-microsoft-standard-WSL2
```

After that, the WSL environment could start normally again.

This reinforced an important lesson:

> When something fails, identify which layer is actually broken before changing the code.

Sometimes the bug isn't in the program.

## What Comes Next

This project is my starting point for learning Solana development.

The next steps are to build on these fundamentals by exploring:

* Solana account models
* PDAs and account constraints
* Cross-program invocations (CPIs)
* Tokens and token accounts
* Transactions and instructions in greater depth
* Solana programs that interact with real applications
* Building backend and frontend clients for Solana programs

## Security Note

Wallet keypairs contain private keys and should **never be committed to Git**.

In particular, files such as:

```text
~/.config/solana/id.json
```

should remain private.

Never use a disposable development keypair for assets with real value.

---

### First Solana Project 🌱

**Solana Fall School · 2026**

Built while learning the foundations of Solana development with Rust and Anchor.
