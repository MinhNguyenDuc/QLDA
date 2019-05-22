import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';
import axios from 'axios';

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { campaigns };
  };


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

    return <Card.Group items={items} />;
  }

  // getCampaignData() {
  //   var items = [];
  //   console.log(typeof items);
  //   this.props.campaigns.map(async (address) => {
  //     var d = await axios.get("http://localhost:4000/campaigns/" + address);
  //     //console.log(d);
  //     items.push({
  //       header: d.data[0].title,
  //       description: (
  //         <Link route={`/campaigns/${address}`}>
  //           <a>View Campaign</a>
  //         </Link>
  //       ),
  //       fluid: true
  //     });
  //   });
  //   console.log(typeof(items));
  //   return <Card.Group items={items} />;
  // };

  // renderCampaigns() {
  //   const items = this.getCampaignData();
  //   console.log(items);
  //   return <Card.Group items={items} />;
  // }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>

          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;