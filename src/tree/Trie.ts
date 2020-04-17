export class Trie {
  private readonly root: TrieNode = new TrieNode(false);

  add(word: string) {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char: string = word[i];
      const isEndOfWord: boolean = word.length === i + 1;
      let childNode = currentNode.getChild(char);

      if (!childNode) {
        childNode = new TrieNode(isEndOfWord);
        currentNode.setChild(char, childNode);
      }

      if (isEndOfWord) {
        childNode.setIsEndOfWord(isEndOfWord);
      }

      currentNode = childNode;
    }
  }

  delete(word: string) {
    const lastChar = word.substring(word.length - 1);
    const headOfString = word.substring(0, word.length - 1);

    const node = this.getNode(headOfString);

    if (node) {
      const child = node.getChild(lastChar);

      if (child) {
        const children = child.getChildren();
        if (Object.keys(children).length === 0) {
          node.removeChild(lastChar);
        } else {
          child.setIsEndOfWord(false);
        }
      }
    }
  }

  find(word: string): string[] {
    const result: string[] = [];
    const node = this.getNode(word);

    if (node) {
      node.find(result, word);
    }

    return result;
  }

  private getNode(word: string): TrieNode | null {
    let currentNode: TrieNode = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const childNode = currentNode.getChild(char);

      if (!childNode) {
        return null;
      }

      currentNode = childNode;
    }

    return currentNode;
  }
}

export class TrieNode {
  private isEndOfWord: boolean;
  private children: { [key: string]: TrieNode } = {};

  constructor(isEndOfWord: boolean) {
    this.isEndOfWord = isEndOfWord;
  }

  getChild(char: string): TrieNode | undefined {
    return this.children[char];
  }

  getChildren(): { [key: string]: TrieNode } {
    return this.children;
  }

  removeChild(char: string) {
    delete this.children[char];
  }

  setChild(char: string, child: TrieNode) {
    this.children[char] = child;
  }

  setIsEndOfWord(isEndOfWord: boolean) {
    this.isEndOfWord = isEndOfWord;
  }

  find(result: string[], word: string) { // TODO move logic to method Trie.find and figure out of recursion
    if (this.isEndOfWord) {
      result.push(word);
    }

    for (let char in this.children) {
      const child = this.children[char];
      child.find(result, word + char);
    }
  }
}
