import { createNft, fetchDigitalAsset, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { airdropIfRequired,getExplorerLink,
    getKeypairFromFile,
 } from "@solana-developers/helpers";

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { generateSigner, Keypair, percentAmount } from "@metaplex-foundation/umi";
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

const collectionMint = generateSigner(umi);

const transaction = await createNft(umi, {
    mint: collectionMint,
    name: "My Collection",
    symbol: "COLL",
    uri: "https://example.com/collection-metadata.json",//should be a uploaded JSON metadata file
    isCollection: true,
    sellerFeeBasisPoints: percentAmount(0),

});



await transaction.sendAndConfirm(umi, { send: { commitment: "finalized" } });
console.log("Created collection NFT with mint:", collectionMint.publicKey);
const createdCollectionNft = await fetchDigitalAsset(umi,collectionMint.publicKey);

console.log(`Created collection, address is ${getExplorerLink("address", collectionMint.publicKey)}`);