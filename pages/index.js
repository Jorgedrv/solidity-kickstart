import React, { Component } from 'react';
import 'semantic-ui-css/semantic.min.css';
import factory from '../ethereum/factory';

import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component {

    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns }
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            };
        });

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h4>Open Campaigns</h4>
                <Link route='/campaigns/new'>
                    <a>
                        <Button basic color='green' content='Create Campaign' icon='add circle' style={{ marginBottom: '10px' }} />
                    </a>
                </Link>
                {this.renderCampaigns()}
            </Layout>
        );
    }
}

export default CampaignIndex;