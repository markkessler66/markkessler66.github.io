# PhyNetPy Sample Code - Basic Network Analysis
import numpy as np
import networkx as nx
import matplotlib.pyplot as plt

# Create a simple network
G = nx.Graph()
G.add_edges_from([
    ('A', 'B'), ('B', 'C'), ('C', 'D'), 
    ('D', 'A'), ('A', 'C'), ('B', 'D')
])

print("=== Basic Network Analysis ===")
print(f"Number of nodes: {G.number_of_nodes()}")
print(f"Number of edges: {G.number_of_edges()}")
print(f"Nodes: {list(G.nodes())}")
print(f"Edges: {list(G.edges())}")

# Calculate basic metrics
density = nx.density(G)
avg_clustering = nx.average_clustering(G)
print(f"\nNetwork Metrics:")
print(f"- Density: {density:.3f}")
print(f"- Average clustering: {avg_clustering:.3f}")

# Degree analysis
degrees = dict(G.degree())
print(f"\nDegree sequence: {list(degrees.values())}")
print(f"Average degree: {sum(degrees.values()) / len(degrees):.2f}")

# Centrality measures
print(f"\n=== Centrality Analysis ===")
degree_cent = nx.degree_centrality(G)
betweenness_cent = nx.betweenness_centrality(G)
closeness_cent = nx.closeness_centrality(G)

print("Degree Centrality:")
for node, cent in sorted(degree_cent.items()):
    print(f"  Node {node}: {cent:.3f}")

print("\nBetweenness Centrality:")
for node, cent in sorted(betweenness_cent.items()):
    print(f"  Node {node}: {cent:.3f}")

print("\nCloseness Centrality:")
for node, cent in sorted(closeness_cent.items()):
    print(f"  Node {node}: {cent:.3f}")
