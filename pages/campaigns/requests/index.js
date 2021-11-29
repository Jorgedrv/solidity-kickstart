import React, { useState } from 'react';
import Layout from '../../../components/Layout';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

const Requests = (props) => {

    const renderRow = () => {
        return props.requests.map((request, index) => {
            return (
                <RequestRow 
                    key={index} 
                    id={index} 
                    request={request} 
                    address={props.address} 
                    approversCount={props.approversCount}
                />
            );
        });
    };

    return (
        <Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${props.address}/requests/new`}>
                <a>
                    <Button primary floated='right' style={{ marginBottom: '10px' }}>Add Request</Button>
                </a>
            </Link>
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Amount</Table.HeaderCell>
                        <Table.HeaderCell>Recipient</Table.HeaderCell>
                        <Table.HeaderCell>Approval Count</Table.HeaderCell>
                        <Table.HeaderCell>Approve</Table.HeaderCell>
                        <Table.HeaderCell>Finalize</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{renderRow()}</Table.Body>
            </Table>
            <div>Found {props.requestsCount} Requests.</div>
        </Layout>
    );
};

Requests.getInitialProps = async (props) => {
    const { address } = props.query;

    const campaign = Campaign(address);

    const summary = await campaign.methods.getSummary().call();
    const requestsCount = summary[2];
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
        Array(requestsCount).fill().map((_element, index) => {
            return campaign.methods.requests(index).call();
        })
    );

    return { address, requests, requestsCount, approversCount };
};

export default Requests;