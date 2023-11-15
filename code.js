const pq = require('@datastructures-js/priority-queue');

function dijkstra(graph, sourceNode, visitedNodes = [], distance = []) {
    // Initialize distances, with sourceNode's distance being 0 and all other nodes being infinity
    // At the same time, initialize whether or not a node has been visited
    distance[sourceNode] = [0, sourceNode]
    visitedNodes[sourceNode] = true
    for(i = 0; i < graph.length; i++)
    {
        if(distance[i] != 0)
        {
            distance[i] = [Infinity, i]
        }
        if(visitedNodes[i] != true)
        {
            visitedNodes[i] = false
        }
    }
    // Turn my distance 2 value array into a priority queue which tracks distances
    distQueue = pq.PriorityQueue.fromArray(distance, (a, b) => a[0] - b[0])
    return distQueue
}

test = [[1],[2],[3],[4],[5]]
test2 = dijkstra(test, 1)
while(!test2.isEmpty())
{
    console.log(test2.dequeue())
}