import { defineMessages } from 'react-intl';

import AnswersStep from 'volto-feedback-italia/components/FeedbackForm/Steps/AnswersStep';
import CommentsStep from 'volto-feedback-italia/components/FeedbackForm/Steps/CommentsStep';
export { AnswersStep, CommentsStep };
export FeedbackForm from 'volto-feedback-italia/components/FeedbackForm/FeedbackForm';
export Rating from 'volto-feedback-italia/components/FeedbackForm/Steps/Commons/Rating';

const messages = defineMessages({
  auth_ft: {
    id: 'auth_ft',
    defaultMessage: 'Login/Logout',
  },
  sitemap_ft: {
    id: 'sitemap_ft',
    defaultMessage: 'Sitemap',
  },
  search_brdc: {
    id: 'search_brdc',
    defaultMessage: 'Ricerca',
  },
});

const applyConfig = (config) => {
  config.settings.siteProperties = {
    ...(config.settings.siteProperties ?? {}),
    enableNoFeedbackFormFor: false,
  };
  config.settings['volto-feedback'] = {
    ...config.settings['volto-feedback'],
    formSteps: [
      {
        step: 0,
        pane: AnswersStep,
      },
      {
        step: 1,
        pane: CommentsStep,
      },
    ],
    // Enable Feedback component in your CMS/Non content routes
    feedbackEnabledNonContentRoutes: [
      ...(config.settings['volto-feedback']?.feedbackEnabledNonContentRoutes ??
        []),
      {
        path: '/login',
        feedbackTitle: messages.auth_ft,
      },
      // { path: '/logout', feedbackTitle: messages.auth_ft },
      { path: '/sitemap', feedbackTitle: messages.sitemap_ft },
      { path: '/search', feedbackTitle: messages.search_brdc },
    ],
  };
  return config;
};

export default applyConfig;
