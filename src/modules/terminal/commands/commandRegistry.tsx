import type { ReactNode } from 'react';

import { blogCommand, getBlogPost } from '@/modules/blog';
import { contentHref } from '@/modules/navigation';
import { getProject, projectsCommand } from '@/modules/projects';

import type { Command } from '../types';
import { contactsCommand } from './contactsCommand';
import { helpCommand } from './helpCommand';
import {
  coffeeCommand,
  cowsayCommand,
  fortuneCommand,
  hackCommand,
  matrixCommand,
  neofetchCommand,
  rickrollCommand,
  sudoCommand,
} from './hidden';
import { resumeCommand } from './resumeCommand';
import { whoamiCommand } from './whoamiCommand';
import { unknownCommand } from './unknownCommand';

export const commandRegistry: Readonly<Record<string, Command>> = {
  whoami: {
    name: 'whoami',
    description: 'Display information about me',
    execute: whoamiCommand,
  },
  projects: {
    name: 'projects',
    description: 'List featured projects',
    execute: projectsCommand,
    href: (args) =>
      !args[0] || getProject(args[0]) ? contentHref('projects', args[0]) : undefined,
  },
  blog: {
    name: 'blog',
    description: 'Read blog posts',
    execute: blogCommand,
    href: (args) => (!args[0] || getBlogPost(args[0]) ? contentHref('blog', args[0]) : undefined),
  },
  contacts: {
    name: 'contacts',
    description: 'Get contact information',
    execute: contactsCommand,
  },
  resume: {
    name: 'resume',
    description: 'Download my resume',
    execute: resumeCommand,
    href: () => contentHref('resume'),
  },
  clear: {
    name: 'clear',
    description: 'Clear the terminal output',
    execute: () => null,
  },
  help: {
    name: 'help',
    description: 'Show available commands',
    execute: (args) => helpCommand(args, Object.values(commandRegistry)),
  },
  neofetch: {
    name: 'neofetch',
    description: 'Display system information',
    execute: neofetchCommand,
    hidden: true,
  },
  sudo: {
    name: 'sudo',
    description: 'Execute command as superuser',
    execute: sudoCommand,
    hidden: true,
  },
  hack: {
    name: 'hack',
    description: 'Initiate hack sequence',
    execute: hackCommand,
    hidden: true,
  },
  fortune: {
    name: 'fortune',
    description: 'Get your fortune',
    execute: fortuneCommand,
    hidden: true,
  },
  cowsay: {
    name: 'cowsay',
    description: 'Make a cow say something',
    execute: cowsayCommand,
    hidden: true,
  },
  matrix: {
    name: 'matrix',
    description: 'Enter the Matrix',
    execute: matrixCommand,
    hidden: true,
  },
  rickroll: {
    name: 'rickroll',
    description: 'Never gonna give you up',
    execute: rickrollCommand,
    hidden: true,
  },
  coffee: {
    name: 'coffee',
    description: 'Get some coffee',
    execute: coffeeCommand,
    hidden: true,
  },
};

export const getVisibleCommands = (): readonly string[] => {
  return Object.values(commandRegistry)
    .filter((command) => !command.hidden)
    .map((command) => command.name);
};

export const commandHref = (input: string): string | undefined => {
  const [name, ...args] = input.trim().toLowerCase().split(/\s+/);
  return commandRegistry[name]?.href?.(args);
};

export const commandOutput = (input: string): ReactNode => {
  const [name, ...args] = input.trim().toLowerCase().split(/\s+/);
  const command = commandRegistry[name];
  return command ? command.execute(args) : unknownCommand(name);
};
