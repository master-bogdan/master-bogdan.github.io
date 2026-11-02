import { cloneElement, isValidElement, type ReactNode } from 'react';

export const countCharacters = (node: ReactNode): number => {
  if (typeof node === 'string') {
    return node.length;
  }

  if (typeof node === 'number') {
    return String(node).length;
  }

  if (Array.isArray(node)) {
    return node.reduce((total, child) => total + countCharacters(child), 0);
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    return countCharacters(node.props.children);
  }

  return 0;
};

export const sliceContent = (
  node: ReactNode,
  remainingCharacters: number,
): readonly [ReactNode, number] => {
  if (remainingCharacters <= 0) {
    return [null, 0];
  }

  if (typeof node === 'string' || typeof node === 'number') {
    const text = String(node);
    const visibleText = text.slice(0, remainingCharacters);
    return [visibleText, remainingCharacters - visibleText.length];
  }

  if (Array.isArray(node)) {
    const visibleChildren: ReactNode[] = [];
    let remaining = remainingCharacters;

    for (const child of node) {
      if (remaining <= 0) {
        break;
      }

      const [visibleChild, nextRemaining] = sliceContent(child, remaining);

      if (visibleChild !== null) {
        visibleChildren.push(visibleChild);
      }

      remaining = nextRemaining;
    }

    return [visibleChildren, remaining];
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    const [visibleChildren, remaining] = sliceContent(node.props.children, remainingCharacters);

    if (visibleChildren === null) {
      return [null, remainingCharacters];
    }

    return [cloneElement(node, undefined, visibleChildren), remaining];
  }

  return [null, remainingCharacters];
};
