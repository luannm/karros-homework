import React, { PureComponent } from 'react';
import { Card, Row, Col, Rate } from 'antd';
import PropTypes from 'prop-types';
import './index.less';

class ResultCard extends PureComponent {
  render() {
    const { data, number } = this.props;
    return (
      <Card className="resultCard">
        <Row>
          <Col md={4} xs={11}>
            <img className="resultCard__photo" alt={data.name} src={data.image_url} />
          </Col>
          <Col md={9} xs={13}>
            <h3 className="resultCard__title">
              {number}. <a className="resultCard__titleUrl" href={data.url}>{data.name}</a>
            </h3>
            <div className="resultCard__rate">
              <Rate disabled value={data.rating} />
              <span className="resultCard__rate__desc ant-rate-text">
                {data.review_count || 0} reviews
              </span>
            </div>
            <div>
              {data.price && `${data.price} - `}
              {data.categories.map(item => item.title).join(' , ')}
            </div>
          </Col>
          <Col md={9} xs={24}>
            <div className="resultCard__address">
              {data.location.display_address.join(' ')}
            </div>
            <div className="resultCard__phone">
              {data.display_phone}
            </div>
          </Col>
        </Row>
      </Card>
    );
  }
}

ResultCard.propTypes = {
  data: PropTypes.object.isRequired,
  number: PropTypes.number
};

export default ResultCard;
