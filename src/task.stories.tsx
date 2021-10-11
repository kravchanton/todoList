import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from "./task";
import {action} from "@storybook/addon-actions";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLIST/Task',
    component: Task,
    argTypes: {},
} as ComponentMeta<typeof Task>;


const removeTaskCallBack = action('Remove button inside task clicked')
const changeTaskStatusCallBack = action('Status changed inside task')
const changeTaskTitleCallBack = action('Title changed inside task')

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

const baseArgs = {
    removeTask: removeTaskCallBack,
    changeTaskStatus: changeTaskStatusCallBack,
    changeTaskTitle: changeTaskTitleCallBack,
}

export const TaskStories = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskStories.args = {
    ...baseArgs,
    task: {
        id: '1',
        title: 'JS',
        isDone: false,

    }
};
export const TaskStoriesCheckTrue = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskStoriesCheckTrue.args = {
    ...baseArgs,
    task: {
        id: '2',
        title: 'HTML',
        isDone: true

    }
};

