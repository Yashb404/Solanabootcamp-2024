import { createNft, fetchDigitalAsset, findMetadataPda, mplTokenMetadata, verifyCollectionV1 } from "@metaplex-foundation/mpl-token-metadata";
import { airdropIfRequired,getExplorerLink,
    getKeypairFromFile,
 } from "@solana-developers/helpers";

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { generateSigner, Keypair, percentAmount, publicKey } from "@metaplex-foundation/umi";
import { keypairIdentity } from "@metaplex-foundation/umi";

const connection = new Connection(clusterApiUrl("devnet"));

const user = await getKeypairFromFile();

await airdropIfRequired(connection, user.publicKey, 1 * LAMPORTS_PER_SOL, 0.5*LAMPORTS_PER_SOL);

console.log("Loaded user",user.publicKey.toBase58());

const umi = await createUmi(connection.rpcEndpoint);

umi.use(mplTokenMetadata());

const umiUser = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
umi.use(keypairIdentity(umiUser));

console.log("Set up Umi instance for user");

const collectionAdrress = publicKey("4RqjVTXBgYxz2GfVx5MxM4VG4DC1L8i7wigp9mb14Cj6");

const nftAddress = publicKey("4RqjVTXBgYxz2GfVx5MxM4VG4DC1L8i7wigp9mb14Cj6");

const transaction = await verifyCollectionV1(umi, {
    metadata: findMetadataPda(umi,{mint: nftAddress}),
    collectionMint:collectionAdrress,
    authority:umi.identity


});

transaction.sendAndConfirm(umi, { send: { commitment: "finalized" } });

console.log(`Verified collection with mint: ${collectionAdrress}`); 