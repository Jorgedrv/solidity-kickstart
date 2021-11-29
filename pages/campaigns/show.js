import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

const Show = (props) => {

    const renderCards = () => {
        const { contribution, balance, requestsCount, approversCount, manager } = props;

        const items = [
            {
                'header': manager,
                'meta': 'Address of Manager',
                'description': 'The manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                'header': contribution,
                'meta': 'Minimun Contribution (wei)',
                'description': 'You must contribute at least this much wei to become an approver'
            },
            {
                'header': requestsCount,
                'meta': 'Number of requests',
                'description': 'A request tries to withdraw money from the contract. Requests must be approved by approvers'
            },
            {
                'header': approversCount,
                'meta': 'Number of approvers',
                'description': 'Number of people who have already donated to this campaign'
            },
            {
                'header': web3.utils.fromWei(balance, 'ether'),
                'meta': 'Campaign Balance (Ether)',
                'description': 'The balance is how much money this campaign has left to spend'
            }
        ];

        return <Card.Group items={items} />;
    }

    return (
        <Layout>
            <h2>show Campaign!</h2>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        {renderCards()}
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={props.address} />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Link route={`/campaigns/${props.address}/requests`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    );
};

Show.getInitialProps = async (props) => {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
        address: props.query.address,
        contribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
    };
};

export default Show;