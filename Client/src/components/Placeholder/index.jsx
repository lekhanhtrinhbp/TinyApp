import React from 'react';
import ContentLoader from 'react-content-loader';
import commonColor from '../../commons/common-colors';

const MyLoader = props => (
  <ContentLoader
    style={{ marginLeft: 150 }}
    height={160}
    width={720}
    speed={1}
    primaryColor={commonColor.mainGreen3}
    secondaryColor="#ecebeb"
    {...props}
  >
    <circle cx="10" cy="20" r="8" />
    <rect x="25" y="15" rx="5" ry="5" width="550" height="10" />
    <circle cx="10" cy="50" r="8" />
    <rect x="25" y="45" rx="5" ry="5" width="600" height="10" />
    <circle cx="10" cy="80" r="8" />
    <rect x="25" y="75" rx="5" ry="5" width="550" height="10" />
    <circle cx="10" cy="110" r="8" />
    <rect x="25" y="105" rx="5" ry="5" width="600" height="10" />
    <circle cx="10" cy="80" r="8" />
    <rect x="25" y="75" rx="5" ry="5" width="550" height="10" />
    <circle cx="10" cy="110" r="8" />
    <rect x="25" y="105" rx="5" ry="5" width="600" height="10" />
    <circle cx="10" cy="80" r="8" />
    <rect x="25" y="75" rx="5" ry="5" width="550" height="10" />
    <circle cx="10" cy="110" r="8" />
    <rect x="25" y="105" rx="5" ry="5" width="600" height="10" />
  </ContentLoader>
);

export default MyLoader;
