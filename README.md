[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12472908&assignment_repo_type=AssignmentRepo)
# Dijkstra's Algorithm

Recall the pseudocode for Dijkstra's algorithm:
- initialize the dist to each vertex to $\infty$, source to 0
- while there are unmarked vertices left in the graph
    - select the unmarked vertex $v$ with the lowest dist
    - mark $v$ with distance dist
    - for each edge $(v,w)$
        - dist($w$) = min $\left(\textrm{dist}(w), \textrm{dist}(v) + \textrm{weight of }(v, w)\right)$

Implement Dijkstra's algorithm. Start with the template I provided in `code.js`
and test your new function. I have not provided any test code, but you can base
yours on test code from other exercises.

The choice of data structures is up to you -- your implementation does not have
to be the most efficient one!

## Runtime Analysis

What is the big $\Theta$ complexity of your implementation? Add your
answer, including your reasoning, to this markdown file.

# Response
I've now went ahead and fixed this so it runs with a priority queue, and am adjusting my runtime analysis accordingly.

## Runtime Analysis
For my implementation, these are the steps I take.
1. Initialize two arrays which keep track of the nodes that have been processed and the distance from the source node to each node. This has a linear runtime proportional to the node count of $|V|$
2. While there are nodes that haven't been processed in the graph, run steps 3 through 5. This has a runtime equal to the number of nodes, $|V|$.
3. Find the next unprocessed node with the smallest distance from the source node. This should have a runtime complexity of $|V|log|V|$, since it is using the inbuilt .sort function with just a comparison determining the relative placement of elements.
4. For each possible edge connected to the node being processed, check if it is an edge and if it would result in a shorter distance to the other node it connects to. Update the distances array accordingly. This has a runtime equal to the number of nodes, $|V|$, since this is an adjacency matrix representation.
5. Mark the node as processed. This is constant time.
6. The shortest distance from the source node has been found for all other nodes. Return this. This is constant time.

So, the overall complexity is $|V| + |V|*(|V|log|V|+|V|) = |V| + |V^2| + |V^2|log|V| = \Theta\left(|V^2|log|V|\right)$

## References
Decided to just use a priority queue library rather than implement my own, so I can work on the part I'm actually interested in.
https://github.com/datastructures-js/priority-queue#import

On how to actually use an outside library in JavaScript
https://stackoverflow.com/questions/61298183/syntax-error-cannot-use-import-statement-outside-a-module

Provided the outside code I tweaked to create my property tests. Thankfully, it didn't take me long to find another implementation of Dijsktra's using outside code I could test against.
https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/

Syntax for JavaScript's map function. So useful, now that I know it exists
https://www.freecodecamp.org/news/higher-order-functions-in-javascript-d9101f9cf528/

Syntax for JavaScript's inbuilt .sort function
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort