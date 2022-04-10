//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract News {
    uint256 newsCount;

    event AddNews(address uploader_address, string title, string description, string publisher, string date_published, uint256 timestamp, uint number, bytes data);

    struct NewsInfo{
        address uploader_address;
        string title;
        string description;
        string publisher;
        string date_published;
        uint256 block_timestamp;
        uint256 block_number;
        bytes block_data;
    }

    NewsInfo[] newsInfos;

    function addToBlockchain(
        string memory _title,
        string memory _description,
        string memory _publisher,
        string memory date_published
    ) public {
        newsCount+=1;
        newsInfos.push(NewsInfo(msg.sender, _title, _description,_publisher, date_published, block.timestamp, block.number,msg.data));
        emit AddNews(msg.sender, _title, _description,_publisher, date_published, block.timestamp, block.number,msg.data);
    }

    function getAllNews() public view returns (NewsInfo[] memory){
        return newsInfos;
    }

    function getNewsCount() public view returns (uint256){
        return newsCount;
    }

}

