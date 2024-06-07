import React, { useState, useEffect, useMemo } from 'react';
import cx from 'classnames';
import { defineMessages } from 'react-intl';
import { usePrevious } from '@plone/volto/helpers';
import { Form, FormGroup, Label, Card } from 'design-react-kit';

import {
  FormHeader,
  getFeedbackQuestions,
  getFeedbackThreshold,
  getTranslatedQuestion,
} from 'volto-feedback';

const messages = defineMessages({
  header_positive: {
    id: 'feedback_answers_header_positive',
    defaultMessage: 'Which were the aspects you liked the most?',
  },
  header_negative: {
    id: 'feedback_answers_header_negative',
    defaultMessage: 'Where did you encounter the biggest problems?',
  },
});

const AnswersStep = ({
  updateFormData,
  userFeedback,
  step,
  totalSteps,
  getFormFieldValue,
  intl,
}) => {
  const initializeState = (newState) => setState(newState);
  const threshold = useMemo(() => getFeedbackThreshold(), []);
  const selectedAnswer = getFormFieldValue('answer');
  const getInitialState = () => {
    if (userFeedback === null) return [];
    return getFeedbackQuestions(userFeedback);
  };

  const [state, setState] = useState(getInitialState());
  const prevFeedback = usePrevious(userFeedback);
  useEffect(() => {
    if (userFeedback !== null) {
      if (
        (prevFeedback &&
          prevFeedback <= threshold &&
          userFeedback >= threshold) ||
        (prevFeedback && prevFeedback >= threshold && userFeedback <= threshold)
      ) {
        updateFormData('answer', null);
      }
      if (prevFeedback !== userFeedback) initializeState(getInitialState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFeedback]);

  const handleAnswerChange = (e) => {
    updateFormData('answer', e.target.value);
  };

  const positiveIsVisible =
    userFeedback !== null && userFeedback > threshold && step === 0;
  const negativeIsVisible =
    userFeedback !== null && userFeedback < threshold && step === 0;

  return (
    <>
      <fieldset
        id="vf-more-positive"
        className={cx('answers-step', { 'd-none': !positiveIsVisible })}
        data-step={step}
        aria-expanded={positiveIsVisible}
        aria-hidden={!positiveIsVisible}
        data-element={'feedback-rating-positive'}
      >
        <FormHeader
          title={intl.formatMessage(messages.header_positive)}
          step={step + 1}
          totalSteps={totalSteps}
          className={
            'answers-header d-flex justify-content-between align-items-center'
          }
          hidden={!positiveIsVisible}
        />
        <Card teaser noWrapper>
          <Form className="answers-form">
            {state?.map((s, i) => (
              <FormGroup
                check
                key={'positive-' + s}
                className={cx('border-bottom border-light', {
                  'mb-4': i < state.length - 1,
                })}
              >
                <input
                  name="answer-input-positive"
                  id={'positive-' + s}
                  type="radio"
                  checked={s === selectedAnswer}
                  value={s}
                  onChange={handleAnswerChange}
                />
                <Label
                  for={'positive-' + s}
                  check
                  className="mb-4"
                  data-element="feedback-rating-answer"
                >
                  {getTranslatedQuestion(intl, s)}
                </Label>
              </FormGroup>
            ))}
          </Form>
        </Card>
      </fieldset>
      <fieldset
        id="vf-more-negative"
        className={cx('answers-step', { 'd-none': !negativeIsVisible })}
        data-step={step}
        aria-expanded={negativeIsVisible}
        aria-hidden={!negativeIsVisible}
        data-element={'feedback-rating-negative'}
      >
        <FormHeader
          title={intl.formatMessage(messages.header_negative)}
          step={step + 1}
          totalSteps={totalSteps}
          className="answers-header d-flex justify-content-between align-items-center"
          hidden={!negativeIsVisible}
        />

        <Card teaser noWrapper>
          <Form className="answers-form">
            {state?.map((s, i) => (
              <FormGroup
                check
                key={'negative-' + s}
                className={cx('border-bottom border-light', {
                  'mb-4': i < state.length - 1,
                })}
              >
                <input
                  name="answer-input-negative"
                  id={'negative-' + s}
                  type="radio"
                  checked={s === selectedAnswer}
                  value={s}
                  onChange={handleAnswerChange}
                />
                <Label
                  for={'negative-' + s}
                  check
                  className="mb-4"
                  data-element="feedback-rating-answer"
                >
                  {getTranslatedQuestion(intl, s)}
                </Label>
              </FormGroup>
            ))}
          </Form>
        </Card>
      </fieldset>
    </>
  );
};

export default AnswersStep;
