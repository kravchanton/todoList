import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./task";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/EditableSpan',
    component: Task,
    argTypes: {
        changeTitle: {
            description: "Value EditableSpan changed"
        },
        value: {
            defaultValue: 'HTML',
            description: "Start value EditableSpan"
        },
    },
} as ComponentMeta<typeof EditableSpan>;


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;


export const EditableSpanStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditableSpanStories.args = {
    changeTitle: action('Changed title'),
    title: "React"
};


