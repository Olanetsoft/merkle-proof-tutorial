const { MerkleTree } = require("merkletreejs");
const SHA256 = require("crypto-js/sha256");

// List of email addresses to be whitelisted
const emails = ["example1@mail.com", "example2@mail.com", "example3@mail.com"];

// Convert each email into a hash
const leaves = emails.map((email) => SHA256(email));

// Create the Merkle Tree using the hashed emails
const tree = new MerkleTree(leaves, SHA256);

// Get the root and convert it to a hexadecimal string
const root = tree.getRoot().toString("hex");

// Function to verify if an email is whitelisted
const verifyEmail = (email) => {
  // Hash the email to be verified
  const hashedEmail = SHA256(email);

  // Get the proof for the hashed email from the tree
  const proof = tree.getProof(hashedEmail);

  // Verify the proof against the root of the tree; returns true if valid, false otherwise
  const verified = tree.verify(proof, hashedEmail, root);

  // Log the result to the console
  console.log(`${email} is ${verified ? "whitelisted" : "not whitelisted"}.`);
};

verifyEmail("example@mail.com"); // Expected output: "example2@mail.com is whitelisted."

verifyEmail("x@mail.com"); // Expected output: "x@mail.com is not whitelisted."
