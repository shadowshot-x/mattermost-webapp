// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {WizardSteps, WizardStep} from './steps'

import './progress.scss'

type Props = {
    step: WizardStep;
    stepOrder: WizardStep[]
    transitionSpeed: number
}


export const Progress = (props: Props) => {
    // exclude transitioning out as a progress step
    const numSteps = props.stepOrder.length - 1;
    if (numSteps < 2) {
        return null;
    }

    const dots = props.stepOrder.filter((step) => step !== WizardSteps.TransitioningOut).map((step) => {
        let className = 'circle';
        if (props.step === step) {
            className += ' active';
        }

        return (
            <div
                key={step}
                className={className}
            />
        );
    });

    return (<div className='FullscreenWizard__progress'>
        <div className='tutorial__circles'>{dots}</div>
    </div>);
};

export default function TransitionedProgress(props: Props) {
    return (
        <CSSTransition
            in={props.step !== WizardSteps.TransitioningOut}
            timeout={props.transitionSpeed}
            classNames={'OnboardingWizardProgress'}
            mountOnEnter={true}
            unmountOnExit={true}
        >
            <Progress {...props}/>
        </CSSTransition>
    );
}