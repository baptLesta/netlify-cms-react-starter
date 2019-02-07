import React from 'react';

import '../src/globalStyles.css';
import data from '../src/data.json';

console.log('React version', React.version);

const CMS = window.CMS;
CMS.registerPreviewStyle(
  'https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css'
);
CMS.registerPreviewStyle('/admin/cms.bundle.css');

const getDocument = (collection, name) =>
  data[collection] && data[collection].filter(page => page.name === name)[0];
const getDocuments = (collection, name) => data[collection];

const globalSettings = getDocument('settings', 'global');
const posts = getDocuments('posts');

// Return to home when user logging out
window.netlifyIdentity.on('logout', function() {
  document.location.href = '/';
});

// Log netlifySiteURL if editing on localhost
if (
  window.location.hostname === 'localhost' &&
  window.localStorage.getItem('netlifySiteURL')
) {
  console.log(
    `%cnetlifySiteURL: ${window.localStorage.getItem('netlifySiteURL')}`,
    'color: hotpink; font-size: 15px'
  );
}
