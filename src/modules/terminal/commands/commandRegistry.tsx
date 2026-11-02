import { blogCommand } from '@/modules/blog';

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
import { projectsCommand } from './projectsCommand';
import { resumeCommand } from './resumeCommand';
import { whoamiCommand } from './whoamiCommand';

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
  },
  blog: {
    name: 'blog',
    description: 'Read blog posts',
    execute: (args, context) => blogCommand(args, (slug) => context.executeCommand(`blog ${slug}`)),
  },
  contacts: {
    name: 'contacts',
    description: 'Get contact information',
    execute: contactsCommand,
  },
  resume: {
    name: 'resume',
    description: 'View my professional profile',
    execute: resumeCommand,
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
