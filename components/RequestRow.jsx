import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

export default ({ id, request, address, approversCount }) => {
    const { description, value, recipient, approvalAccount, complete } = request;

    const readyToFinalize = approvalAccount >= approversCount / 2;

    const onApprove = async () => {
        const campaign = Campaign(address);

        const accounts = await web3.eth.getAccounts();

        await campaign.methods.approveRequest(id).send({
            from: accounts[0]
        });
        Router.replaceRoute(`/campaigns/${address}/requests`);
    };

    const onFinalize = async () => {
        const campaign = Campaign(address);

        const accounts = await web3.eth.getAccounts();

        await campaign.methods.finalizeRequest(id).send({
            from: accounts[0]
        });
        Router.replaceRoute(`/campaigns/${address}/requests`);
    };

    return (
        <Table.Row disabled={complete} positive={readyToFinalize && !complete}>
            <Table.Cell>{id}</Table.Cell>
            <Table.Cell>{description}</Table.Cell>
            <Table.Cell>{web3.utils.fromWei(value, 'ether')}</Table.Cell>
            <Table.Cell>{recipient}</Table.Cell>
            <Table.Cell>{approvalAccount}/{approversCount}</Table.Cell>
            {
                complete ? null :
                    (
                        <Table.Cell>
                            <Button color='green' basic onClick={onApprove}>approve</Button>
                        </Table.Cell>
                    )
            }
            {
                complete ? null :
                    (
                        <Table.Cell>
                            <Button color='teal' basic onClick={onFinalize}>Finalize</Button>
                        </Table.Cell>
                    )
            }
        </Table.Row>
    );
};