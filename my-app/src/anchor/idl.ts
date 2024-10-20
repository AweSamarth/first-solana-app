import { Idl } from "@coral-xyz/anchor";

export const IDL: Idl = {
  version: "0.1.0",
  name: "first_solana",
  instructions: [
    {
      name: "increment",
      accounts: [
        {
          name: "counter",
          isMut: true,
          isSigner: false,
        },
      ],
      args: [],
    },
    {
      name: "initialize",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "counter",
          isMut: true,
          isSigner: false,
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [],
    },
  ],
  accounts: [
    {
      name: "Counter",
      type: {
        kind: "struct",
        fields: [
          {
            name: "count",
            type: "u64",
          },
          {
            name: "bump",
            type: "u8",
          },
        ],
      },
    },
  ],
};

export type FirstSolana = typeof IDL;