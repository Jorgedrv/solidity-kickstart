import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

export default () => {

    const [contribution, setContribution] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const onSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setLoading(true);
        try {
            const accounts = await web3.eth.getAccounts();

            await factory.methods.createCampaign(contribution).send({
                from: accounts[0],
                gas: 10000000
            });
            
            Router.pushRoute('/');
        } catch (error) {
            setMessage(error.message);
        }
        setContribution('');
        setLoading(false);
    }

    return (
        <Layout>
            <h2>New Campaign!</h2>
            <Form onSubmit={onSubmit} error={!!message}>
                <Form.Field>
                    <label>Minimun Contribution</label>
                    <Input
                        label='wei'
                        labelPosition='right'
                        value={contribution}
                        onChange={Event => setContribution(Event.target.value)}
                    />
                </Form.Field>
                <Message error header='Oop, something went wrong!' content={message} />
                <Button primary loading={loading} disabled={loading}>Create</Button>
            </Form>
        </Layout>
    );
};