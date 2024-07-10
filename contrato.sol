// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFTContract is ERC721, Ownable {
    uint256 public tokenCounter;

    struct Book {
        string name;
        string author;
        string price;
        string hash;
    }

    mapping(uint256 => Book) public books;

    constructor(string memory name, string memory symbol, address initialOwner) ERC721(name, symbol) Ownable(initialOwner) {
        tokenCounter = 0;
    }

    function mint(string memory _name, string memory _author, string memory _price, string memory _hash) public onlyOwner {
        uint256 tokenId = tokenCounter;
        books[tokenId] = Book(_name, _author, _price, _hash);
        _safeMint(msg.sender, tokenId);
        tokenCounter++;
    }
}
