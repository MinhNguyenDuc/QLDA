import React, { Component } from 'react';
import { Form, Button, Input, Message, TextArea } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import axios from 'axios';
import {Image} from 'semantic-ui-react';

const CampaignModel = require('../../models/campaign');

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    title: '',
    description: '',
    errorMessage: '',
    imageUrl: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      var result = await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });
      
      var campaignAddress = result.events.NewCampaignAddress.returnValues.contractAddress;

      axios.post('http://localhost:4000/campaigns', {
          address: campaignAddress,
          title : this.state.title,
          description: this.state.description,
          minimumContribution: this.state.minimumContribution,
          imageUrl : this.state.imageUrl,
        }
      ).then(result => console.log(result));
      
      //newCampaign.save().then(console.log);

      //console.log(result);
      //console.log(campaignAddress);  
      

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
      console.log(err);
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        <Image src={this.state.imageUrl} size='big' />

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Title</label>
            <Input
              placeholder="Campaign Title"
              value={this.state.title}
              onChange={event =>
                this.setState({ title: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Description</label>
            <TextArea name="content" id="editor" placeholder='Campain detail' 
            onChange={event =>
              this.setState({ description: event.target.value })}
            value={this.state.description} />
          </Form.Field>

          <Form.Field>
            <label>Image</label>
            <Input
              placeholder="Image"
              value={this.state.imageUrl}
              onChange={event =>
                this.setState({ imageUrl: event.target.value })}
            />
          </Form.Field> 
      
        
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;