import { Card, Col, Row, Skeleton } from 'antd';

interface ShimmerProps {
  count?: number;
  type?: 'search' | 'details';
}

const Shimmer = ({ count, type }: ShimmerProps) => {
  return (
    <>
      {type === 'details' ? (
        <>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Skeleton.Image style={{ width: '100%', height: 'auto' }} />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Skeleton
                active
                paragraph={{ rows: 16 }}
                title={{ width: '80%' }}
              />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {[...Array(count)].map((_, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={4}>
                <Card hoverable>
                  <Skeleton active paragraph={{ rows: 12 }} />
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Shimmer;
