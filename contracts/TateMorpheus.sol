// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;
import { IERC721, ERC721, ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { ERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @dev This contract is using for testing create course with external NFT Contract
 */
contract TateMorpheus is ERC721URIStorage, ERC721Enumerable, Ownable {
    event MintedNFT(address indexed to, uint256 tokenId, string uri);
    event MintedBatch(address indexed to, uint256[] tokenIds, string[] uris);

    uint256 public constant MAX_BATCH = 20;

    /**
     * @notice ID of Minted NFT, increase by 1
     */
    uint256 public currentId;

    /**
     * @notice Function called when contract is deployed
     * @param name Name of NFT
     * @param symbol Symbol of NFT
     */
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    /**
     * @notice mint a NFT for _to address
     * @param _to address of user
     * @param _uri Ipfs link of NFT
     * 
     * emit { MintedNFT } events
     */
    function mintNFT(address _to, string memory _uri) external onlyOwner {
        require(_to != address(0), "Invalid address");
        currentId++;
        _safeMint(_to, currentId);
        _setTokenURI(currentId, _uri);

        emit MintedNFT(_to, currentId, _uri);
    }

    function mintBatch(address _to, uint256 _amount, string[] memory _uris) external onlyOwner {
        require(
            _amount > 0 && _amount <= MAX_BATCH,
            "must mint at least one and fewer than MAX_BATCH"
        );
        require(_amount == _uris.length, "uris array length mismatch");

        uint256 id = currentId;
        uint256[] memory tokenIds = new uint256[](_amount);
        for (uint256 i = 0; i < _amount; i++) {
            tokenIds[i] = id;
            _safeMint(_to, ++id);
            _setTokenURI(id, _uris[i]);
        }
        currentId = id;

        emit MintedBatch(_to, tokenIds, _uris);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    } 
}