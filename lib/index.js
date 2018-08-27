import Trie from "./lib/Trie";

var prefixTrie = new Trie();

prefixTrie.insert("hello");

prefixTrie.count();

prefixTrie.insert('world');

prefixTrie.count();
