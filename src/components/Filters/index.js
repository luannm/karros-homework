import React, { PureComponent } from 'react';
import { Row, Radio, Tooltip, Button } from 'antd';
import './index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Filters extends PureComponent {
  _renderButtons() {
    const BUTTONS = [{
      tooltip: 'Find businesses that are open now',
      title: 'Open Now',
      icon: 'clock-circle-o'
    }, {
      tooltip: 'Find businesses that deliver to you',
      title: 'Order Delivery',
      icon: 'car'
    }, {
      tooltip: 'Find businesses where you can order takeout',
      title: 'Order Takeout',
      icon: 'gift'
    }, {
      tooltip: 'Find businesses that allow you to book online',
      title: 'Online Booking',
      icon: 'calendar'
    }, {
      tooltip: 'Show all filters',
      title: 'All Filters',
      icon: 'filter'
    }];

    return BUTTONS.map(button => (
      <Tooltip key={button.title} title={button.tooltip || ''}>
        <Button
          className="filters__filterController"
          size="large"
          icon={button.icon}
          onClick={button.action}
        >
          {button.title}
        </Button>
      </Tooltip>
    ));
  }

  render() {
    return (
      <div>
        <Row className="filters">
          <RadioGroup size="large" className="filters__filterController">
            <Tooltip title="Inexpensive">
              <RadioButton value="a">$</RadioButton>
            </Tooltip>
            <Tooltip title="Moderate">
              <RadioButton value="b">$$</RadioButton>
            </Tooltip>
            <Tooltip title="Pricey">
              <RadioButton value="c">$$$</RadioButton>
            </Tooltip>
            <Tooltip title="Ultra High-End">
              <RadioButton value="d">$$$$</RadioButton>
            </Tooltip>
          </RadioGroup>
          {this._renderButtons()}
        </Row>
      </div>
    );
  }
}

export default Filters;
