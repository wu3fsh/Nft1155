//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract Nft1155 is ERC1155 {
    string _tokenBaseUri =
        "ipfs://QmPLRr5WWHmv6B5gaapAqL9onc1sKSkAny7dE6ng2pHWGA/{id}.json";
    uint8 constant _maxTokensAmount = 10;

    constructor(string memory tokenUri)
        ERC1155(bytes(tokenUri).length != 0 ? tokenUri : _tokenBaseUri)
    {
        if (bytes(tokenUri).length != 0) {
            _tokenBaseUri = tokenUri;
        }
    }

    function mint(
        address to,
        uint8 tokenId,
        uint256 amount
    ) external {
        require(
            tokenId > 0 && tokenId <= _maxTokensAmount,
            "TokenId should be in the range from 1 to 10"
        );
        _mint(to, tokenId, amount, "");
    }

    function getBaseTokenUri() public view returns (string memory) {
        return _tokenBaseUri;
    }

    function getMaxAllowedTokensAmount() public pure returns (uint8) {
        return _maxTokensAmount;
    }
}
