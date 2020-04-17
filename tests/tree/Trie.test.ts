import { expect } from "chai";
import { Trie, TrieNode } from "../../src/tree/Trie";

describe("tree/TrieNode", function () {

  let emptyTrieNode: TrieNode;
  let trieNode: TrieNode;

  beforeEach("fill", function () {

    emptyTrieNode = new TrieNode(false);

    trieNode = new TrieNode(false);
    trieNode.setChild("a", new  TrieNode(false));
    trieNode.setChild("b", new  TrieNode(false));
    trieNode.setChild("c", new  TrieNode(true));

  });

  it('#constructor', function () {

    expect(emptyTrieNode).has.deep.property("children", {});
    expect(emptyTrieNode).has.property("isEndOfWord",false);

  });

  it('#getChild', function () {

    expect(emptyTrieNode.getChild("")).to.equal(undefined);
    expect(emptyTrieNode.getChild("c")).to.equal(undefined);

    expect(trieNode.getChild("")).to.equal(undefined);
    expect(trieNode.getChild("v")).to.equal(undefined);

    const child = trieNode.getChild("a");
    const child2 = trieNode.getChild("c");

    expect(child).has.deep.property("children", {});
    expect(child).has.property("isEndOfWord",false);

    expect(child2).has.deep.property("children", {});
    expect(child2).has.property("isEndOfWord",true);

  });

  it('#getChildren', function () {

    expect(emptyTrieNode.getChildren()).to.deep.equal({});
    expect(trieNode.getChildren()).to.deep.equal({
      "a": new TrieNode(false),
      "b": new TrieNode(false),
      "c": new TrieNode(true),
    });

  });

  it('#removeChild', function () {

    emptyTrieNode.removeChild("a");
    emptyTrieNode.removeChild("b");
    emptyTrieNode.removeChild("c");

    trieNode.removeChild("a");
    trieNode.removeChild("c");
    trieNode.removeChild("x");

    expect(emptyTrieNode).has.deep.property("children", {});
    expect(trieNode).has.deep.property("children", { "b": new TrieNode(false) });

  });

  it('#setChild', function () {

    emptyTrieNode.setChild("x", new TrieNode(false));
    emptyTrieNode.setChild("y", new TrieNode(true));

    trieNode.setChild("a", new TrieNode(true));
    trieNode.setChild("b", new TrieNode(true));
    trieNode.setChild("c", new TrieNode(false));

    expect(emptyTrieNode).has.deep.property("children", {
      "x": new TrieNode(false),
      "y": new TrieNode(true),
    });

    expect(trieNode).has.deep.property("children", {
      "a": new TrieNode(true),
      "b": new TrieNode(true),
      "c": new TrieNode(false),
    });

  });

  it("#setIsEndOfWord", function() {

    trieNode.setIsEndOfWord(true);

    expect(trieNode).has.property("isEndOfWord", true);

    trieNode.setIsEndOfWord(false);

    expect(trieNode).has.property("isEndOfWord", false);

  });

  it("#find", function() {

    const result1: string[] = [];
    const result2: string[] = [];

    emptyTrieNode.find(result1, "word");
    trieNode.find(result2, "word");

    expect(result1).deep.equal([]);
    expect(result2).deep.equal(["wordc"]);

  });
});

describe("tree/Trie", function () {
  describe("create", function () {
    it('should create', function () {
      // const trie = new Trie();
      // expect(trie["root"]).deep.equal({});
    });
  });
});
