/**
 * SwitchParentage / SRPP demo for Scenario D.
 *
 * Topology and ploidy rules follow PhyNetPy's SwitchParentage (ModelMove.py)
 * and the SRPP algorithms in the MP-Allop-2 paper. Extra-lineage scoring
 * follows Allop_MUL.extra_lineages in _infer_mp_allop.py.
 */
(() => {
    "use strict";

    const SVG_NS = "http://www.w3.org/2000/svg";
    const PLAY_MS = 2800;
    const TWEEN_MS = 480;

    const GT_NEWICK = {
        GT1: "(((b,(xB,(yB,zB))),(a,(xA,(yA,zA)))),o);",
        GT2: "(((b,(yB,(xB,zB))),(a,(xA,(yA,zA)))),o);",
        GT3: "((((b,xB),(yB,zB)),(a,(xA,(yA,zA)))),o);",
    };
    const MUL_TRUE = "(((b,(xB,(yB,zB))),(a,(xA,(yA,zA)))),o);";
    const MUL_START = "((b,(a,(xA,(yA,zA)))),(o,(xB,(yB,zB))));";

    const LEAF_META = {
        a: { bio: "2n", kind: "diploid" },
        b: { bio: "2n", kind: "diploid" },
        o: { bio: "2n", kind: "diploid" },
        x: { bio: "4n", kind: "tetra" },
        y: { bio: "4n", kind: "tetra" },
        z: { bio: "4n", kind: "tetra" },
        xA: { bio: "A", kind: "tetra" },
        xB: { bio: "B", kind: "tetra" },
        yA: { bio: "A", kind: "tetra" },
        yB: { bio: "B", kind: "tetra" },
        zA: { bio: "A", kind: "tetra" },
        zB: { bio: "B", kind: "tetra" },
    };

    function node(id, x, y, extra = {}) {
        return Object.assign({ id, label: extra.label ?? id, x, y, kind: extra.kind || "tree" }, extra);
    }

    function edge(src, dest, extra = {}) {
        return Object.assign({ id: `${src}->${dest}`, src, dest, kind: extra.kind || "tree" }, extra);
    }

    function graph(nodes, edges) {
        const map = {};
        nodes.forEach((n) => { map[n.id] = n; });
        return { nodes: map, edges };
    }

    /** Ground-truth Scenario D: o outgroup; H1 parents sister to a and b. */
    function layoutTrue() {
        return graph([
            node("R", 320, 40, { kind: "root", label: "R", p: 1 }),
            node("N1", 230, 118, { label: "", p: 1 }),
            node("o", 478, 178, { kind: "leaf", p: 1 }),
            node("N2", 128, 214, { label: "", p: 1 }),
            node("N3", 312, 214, { label: "", p: 1 }),
            node("b", 52, 316, { kind: "leaf", p: 1 }),
            node("H1", 228, 316, { kind: "retic", p: 2 }),
            node("a", 404, 316, { kind: "leaf", p: 1 }),
            node("N4", 228, 388, { label: "", p: 2 }),
            node("x", 132, 458, { kind: "leaf", p: 2 }),
            node("N5", 318, 458, { label: "", p: 2 }),
            node("y", 258, 508, { kind: "leaf", p: 2 }),
            node("z", 390, 508, { kind: "leaf", p: 2 }),
        ], [
            edge("R", "N1"), edge("R", "o"),
            edge("N1", "N2"), edge("N1", "N3"),
            edge("N2", "b"), edge("N2", "H1"),
            edge("N3", "H1", { kind: "retic" }), edge("N3", "a"),
            edge("H1", "N4"), edge("N4", "x"), edge("N4", "N5"),
            edge("N5", "y"), edge("N5", "z"),
        ]);
    }

    /**
     * Search start: H1 parented by a and o. b is nearby but not a parent.
     * One SwitchParentage (drop o-parent, attach beside b) recovers truth.
     */
    function layoutStart() {
        return graph([
            node("R", 320, 40, { kind: "root", label: "R", p: 1 }),
            node("N1", 198, 122, { label: "", p: 1 }),
            node("C", 442, 122, { label: "", p: 1 }),
            node("b", 88, 232, { kind: "leaf", p: 1 }),
            node("N3", 248, 214, { label: "", p: 1 }),
            node("o", 530, 232, { kind: "leaf", p: 1 }),
            node("H1", 348, 286, { kind: "retic", p: 2 }),
            node("a", 168, 304, { kind: "leaf", p: 1 }),
            node("N4", 348, 360, { label: "", p: 2 }),
            node("x", 252, 438, { kind: "leaf", p: 2 }),
            node("N5", 438, 438, { label: "", p: 2 }),
            node("y", 368, 508, { kind: "leaf", p: 2 }),
            node("z", 508, 508, { kind: "leaf", p: 2 }),
        ], [
            edge("R", "N1"), edge("R", "C"),
            edge("N1", "b"), edge("N1", "N3"),
            edge("N3", "H1", { kind: "retic" }), edge("N3", "a"),
            edge("C", "o"), edge("C", "H1", { kind: "retic" }),
            edge("H1", "N4"), edge("N4", "x"), edge("N4", "N5"),
            edge("N5", "y"), edge("N5", "z"),
        ]);
    }

    /** After DisconnectMSWLE on C→H1. C suppressed; o rises to the root. */
    function layoutDisconnect() {
        return graph([
            node("R", 320, 40, { kind: "root", label: "R", p: 1 }),
            node("N1", 210, 122, { label: "", p: 1 }),
            node("o", 500, 178, { kind: "leaf", p: 1 }),
            node("b", 96, 236, { kind: "leaf", p: 1 }),
            node("N3", 260, 214, { label: "", p: 1 }),
            node("H1", 300, 312, { kind: "tree", p: 1 }),
            node("a", 168, 312, { kind: "leaf", p: 1 }),
            node("N4", 300, 380, { label: "", p: 1 }),
            node("x", 208, 452, { kind: "leaf", p: 1 }),
            node("N5", 392, 452, { label: "", p: 1 }),
            node("y", 328, 508, { kind: "leaf", p: 1 }),
            node("z", 464, 508, { kind: "leaf", p: 1 }),
            node("C", 442, 122, { kind: "ghost", label: "" }),
        ], [
            edge("R", "N1"), edge("R", "o"),
            edge("N1", "b"), edge("N1", "N3"),
            edge("N3", "H1"), edge("N3", "a"),
            edge("H1", "N4"), edge("N4", "x"), edge("N4", "N5"),
            edge("N5", "y"), edge("N5", "z"),
            edge("C", "H1", { kind: "ghost" }),
        ]);
    }

    function layoutMulTrue() {
        return graph([
            node("R", 320, 36, { kind: "root", label: "R", p: 1 }),
            node("M1", 250, 108, { label: "M1", p: 1 }),
            node("o", 500, 168, { kind: "leaf", p: 1 }),
            node("M2", 130, 188, { label: "M2", p: 1 }),
            node("M3", 340, 188, { label: "M3", p: 1 }),
            node("b", 48, 268, { kind: "leaf", p: 1 }),
            node("N4B", 168, 268, { label: "", p: 1 }),
            node("a", 292, 268, { kind: "leaf", p: 1 }),
            node("N4A", 400, 268, { label: "", p: 1 }),
            node("xB", 108, 348, { kind: "leaf", p: 1 }),
            node("N5B", 220, 348, { label: "", p: 1 }),
            node("xA", 352, 348, { kind: "leaf", p: 1 }),
            node("N5A", 456, 348, { label: "", p: 1 }),
            node("yB", 176, 436, { kind: "leaf", p: 1 }),
            node("zB", 268, 436, { kind: "leaf", p: 1 }),
            node("yA", 412, 436, { kind: "leaf", p: 1 }),
            node("zA", 508, 436, { kind: "leaf", p: 1 }),
        ], [
            edge("R", "M1"), edge("R", "o"),
            edge("M1", "M2"), edge("M1", "M3"),
            edge("M2", "b"), edge("M2", "N4B"),
            edge("M3", "a"), edge("M3", "N4A"),
            edge("N4B", "xB"), edge("N4B", "N5B"),
            edge("N4A", "xA"), edge("N4A", "N5A"),
            edge("N5B", "yB"), edge("N5B", "zB"),
            edge("N5A", "yA"), edge("N5A", "zA"),
        ]);
    }

    function layoutMulStart() {
        return graph([
            node("R", 320, 36, { kind: "root", label: "R", p: 1 }),
            node("N1", 190, 112, { label: "N1", p: 1 }),
            node("C", 450, 112, { label: "C", p: 1 }),
            node("b", 88, 200, { kind: "leaf", p: 1 }),
            node("N3", 240, 200, { label: "N3", p: 1 }),
            node("o", 400, 200, { kind: "leaf", p: 1 }),
            node("N4B", 520, 200, { label: "", p: 1 }),
            node("a", 168, 286, { kind: "leaf", p: 1 }),
            node("N4A", 292, 286, { label: "", p: 1 }),
            node("xB", 468, 286, { kind: "leaf", p: 1 }),
            node("N5B", 572, 286, { label: "", p: 1 }),
            node("xA", 236, 372, { kind: "leaf", p: 1 }),
            node("N5A", 348, 372, { label: "", p: 1 }),
            node("yB", 528, 372, { kind: "leaf", p: 1 }),
            node("zB", 616, 372, { kind: "leaf", p: 1 }),
            node("yA", 300, 456, { kind: "leaf", p: 1 }),
            node("zA", 404, 456, { kind: "leaf", p: 1 }),
        ], [
            edge("R", "N1"), edge("R", "C"),
            edge("N1", "b"), edge("N1", "N3"),
            edge("C", "o"), edge("C", "N4B"),
            edge("N3", "a"), edge("N3", "N4A"),
            edge("N4A", "xA"), edge("N4A", "N5A"),
            edge("N4B", "xB"), edge("N4B", "N5B"),
            edge("N5A", "yA"), edge("N5A", "zA"),
            edge("N5B", "yB"), edge("N5B", "zB"),
        ]);
    }

    /* ---------- extra-lineage scorer (Allop_MUL) ---------- */

    function parseNewick(s) {
        const str = s.trim().replace(/;$/, "");
        let i = 0;
        const skip = () => { while (i < str.length && /\s/.test(str[i])) i += 1; };
        const parse = () => {
            skip();
            if (str[i] === "(") {
                i += 1;
                const kids = [parse()];
                for (;;) {
                    skip();
                    if (str[i] === ",") { i += 1; kids.push(parse()); }
                    else break;
                }
                skip();
                if (str[i] === ")") i += 1;
                skip();
                let name = "";
                while (i < str.length && !/[(),;]/.test(str[i])) name += str[i++];
                return { name: name || null, kids };
            }
            let name = "";
            while (i < str.length && !/[(),;]/.test(str[i])) name += str[i++];
            return { name, kids: [] };
        };
        const root = parse();
        let uid = 0;
        const index = (n, parent = null) => {
            n.parent = parent;
            if (!n.name) n.name = `N${++uid}`;
            n.leaf = n.kids.length === 0;
            n.kids.forEach((c) => index(c, n));
        };
        index(root);
        const nodes = [];
        const walk = (n) => { nodes.push(n); n.kids.forEach(walk); };
        walk(root);
        const by = Object.fromEntries(nodes.map((n) => [n.name, n]));
        return { root, nodes, by };
    }

    function leafNames(n) {
        if (n.leaf) return [n.name];
        return n.kids.flatMap(leafNames);
    }

    function mrca(by, labels) {
        const ancs = (name) => {
            const chain = [];
            let n = by[name];
            while (n) { chain.push(n); n = n.parent; }
            return chain;
        };
        const set = Array.from(labels);
        let chain = ancs(set[0]);
        set.forEach((lab) => {
            const ids = new Set(ancs(lab).map((x) => x.name));
            chain = chain.filter((x) => ids.has(x.name));
        });
        return chain[0];
    }

    function extraLineages(mulNewick, geneNewick) {
        const mul = parseNewick(mulNewick);
        const gene = parseNewick(geneNewick);
        const coal = {};
        const key = (a, b) => `${a ?? "∅"}→${b}`;
        gene.nodes.forEach((v) => {
            if (v.leaf) return;
            const vp = mrca(mul.by, leafNames(v));
            const e = key(vp.parent && vp.parent.name, vp.name);
            (coal[e] || (coal[e] = [])).push(v.name);
        });
        const xl = {};
        const walk = (n) => {
            if (n.leaf) {
                xl[key(n.parent.name, n.name)] = [1, 1];
                return;
            }
            let bottom = 0;
            n.kids.forEach((c) => {
                walk(c);
                bottom += xl[key(n.name, c.name)][1];
            });
            const e = key(n.parent && n.parent.name, n.name);
            xl[e] = [bottom, bottom - (coal[e] || []).length];
        };
        walk(mul.root);
        let total = 0;
        const parts = [];
        mul.nodes.forEach((n) => {
            if (!n.parent) return;
            const e = key(n.parent.name, n.name);
            const c = n.leaf ? 0 : (coal[e] || []).length;
            const contrib = xl[e][0] - 1 - c;
            total += contrib;
            parts.push({ edge: e, bottom: xl[e][0], top: xl[e][1], coals: c, xl: contrib });
        });
        const re = key(null, mul.root.name);
        const rootContrib = xl[re][0] - (coal[re] || []).length - 1;
        total += rootContrib;
        parts.push({ edge: re, bottom: xl[re][0], top: xl[re][1], coals: (coal[re] || []).length, xl: rootContrib });
        return { total, parts, coal };
    }

    const SCORE = {
        start: {
            GT1: extraLineages(MUL_START, GT_NEWICK.GT1).total,
            GT2: extraLineages(MUL_START, GT_NEWICK.GT2).total,
            GT3: extraLineages(MUL_START, GT_NEWICK.GT3).total,
        },
        truth: {
            GT1: extraLineages(MUL_TRUE, GT_NEWICK.GT1).total,
            GT2: extraLineages(MUL_TRUE, GT_NEWICK.GT2).total,
            GT3: extraLineages(MUL_TRUE, GT_NEWICK.GT3).total,
        },
    };
    SCORE.start.sum = SCORE.start.GT1 + SCORE.start.GT2 + SCORE.start.GT3;
    SCORE.truth.sum = SCORE.truth.GT1 + SCORE.truth.GT2 + SCORE.truth.GT3;

    /* ---------- steps ---------- */

    const STEPS = [
        {
            id: "truth",
            kicker: "Scenario D",
            title: "The history we want to recover",
            body: "Jones / Yan Scenario D: diploids a and b, outgroup o, and an allopolyploid clade {x, y, z}. The hybrid node H1 has two parents — one sister to a, one sister to b — so the tetraploids inherit a complete genome from each lineage.",
            algo: "Valid network  Ψ  w.r.t. ploidy π\n  p(root) = 1\n  p(e) = p(e_src)\n  p(v) = Σ p(e)  over in-edges of v\n  ∀ leaf x:  p(x) = π(x)",
            highlight: "",
            layout: layoutTrue,
            ploidy: false,
            scores: null,
            legend: "network",
            titlebar: "Species network · ground truth",
            mode: "Scenario D",
        },
        {
            id: "start",
            kicker: "Search state",
            title: "A plausible but wrong parentage",
            body: "Hill climbing starts somewhere legal. Here H1 is still sister to a, but its second parent is o instead of b. The tips still have the right ploidy, so the old six-move kernel would have accepted this — and then wasted proposals trying to fix it.",
            algo: "Search starts from a valid network\n  π(a)=π(b)=π(o)=1\n  π(x)=π(y)=π(z)=2\n\nCurrent parentage of H1:  {a-edge, o-edge}",
            highlight: "Current parentage",
            layout: layoutStart,
            ploidy: false,
            scores: { current: SCORE.start.sum, proposed: "—", verdict: "—" },
            legend: "network",
            titlebar: "Species network · current",
            mode: "iteration t",
        },
        {
            id: "ploidy",
            kicker: "Step 1 · CalculatePloidy",
            title: "Annotate every node and edge",
            body: "Ploidy flows from the root. Tree nodes copy their parent; a reticulation sums both incoming edges. {x, y, z} are 2 because H1 is. This map is the invariant the rest of the move has to restore.",
            algo: "CalculatePloidy(G)\n  node_ploidy[root] ← 1\n  for v in topological order:\n    node_ploidy[v] ← Σ node_ploidy[parent]\n    for each child c:\n      edge_ploidy[(v,c)] ← node_ploidy[v]",
            highlight: "node_ploidy[v] ← Σ node_ploidy[parent]",
            layout: layoutStart,
            ploidy: true,
            scores: { current: SCORE.start.sum, proposed: "—", verdict: "—" },
            legend: "network",
            titlebar: "Species network · current",
            mode: "p(·) shown",
        },
        {
            id: "select",
            kicker: "Step 2 · Select",
            title: "Pick H1 and the o-parent edge",
            body: "SRPP draws a non-root node n and one incoming edge e. We take n = H1 and e = C→H1, the parent that is feeding the hybrid from o. Target ploidy is p(H1) = 2.",
            algo: "SRPP(G)\n  n ← H1          ▷ random non-root\n  e ← (C, H1)     ▷ random in-edge\n  target ← P(H1) = 2\n  DisconnectMSWLE(G, n)\n  Reattach(G, n, target)",
            highlight: "e ← (C, H1)",
            layout: layoutStart,
            ploidy: true,
            selectNodes: ["H1", "C", "o"],
            selectEdges: ["C->H1"],
            scores: { current: SCORE.start.sum, proposed: "—", verdict: "—" },
            legend: "network",
            titlebar: "Species network · current",
            mode: "n = H1, e = C→H1",
        },
        {
            id: "disconnect",
            kicker: "Step 3 · DisconnectMSWLE",
            title: "Detach the subnetwork at its parentage",
            body: "Delete C→H1, then suppress the now-useless C. o rises to become a child of the root. H1 is temporarily a tree node: p(H1) drops to 1, and so do x, y, z. Everything outside Ψ_H1 is unchanged.",
            algo: "DisconnectMSWLE(Ψ, n)\n  e ← in-edge (C, H1)\n  delete e\n  if L_C ≠ L_H1: stop at this MSWLE\n  suppress C  (in=1, out=1 → bypass)\n\nNow P(H1) = 1  <  target 2",
            highlight: "delete e",
            layout: layoutDisconnect,
            ploidy: true,
            selectNodes: ["H1"],
            underNodes: ["H1", "x", "y", "z"],
            selectEdges: ["C->H1"],
            scores: { current: SCORE.start.sum, proposed: "—", verdict: "—" },
            legend: "network",
            titlebar: "Species network · detached",
            mode: "p(H1) = 1",
        },
        {
            id: "reattach",
            kicker: "Step 4 · Reattach",
            title: "Restore the missing subgenome from b",
            body: "Reattach only along edges with p(e) ≤ target − p(H1). Splitting N1→b and hanging H1 off the new node puts a second parent on H1. p(H1) returns to 2, so the tetraploid clade is legal again.",
            algo: "Reattach(G, H1, target=2)\n  while P(H1) ≠ 2:\n    valid ← { e | P(e) ≤ 2 − P(H1) }\n    pick e = (N1, b)\n    subdivide e; attach H1\n    H1 becomes a reticulation",
            highlight: "pick e = (N1, b)",
            layout: layoutTrue,
            ploidy: true,
            selectNodes: ["H1", "b", "N2"],
            selectEdges: ["N2->H1", "N2->b"],
            freshEdges: ["N2->H1"],
            scores: { current: SCORE.start.sum, proposed: SCORE.truth.sum, verdict: "—" },
            legend: "network",
            titlebar: "Species network · proposed",
            mode: "p(H1) = 2",
        },
        {
            id: "valid",
            kicker: "Invariant",
            title: "Same tips, different parents",
            body: "The leaf set and the per-leaf ploidy map are identical to the start. That is the whole point of SRPP: the proposal is valid by construction, so the search never spends a turn on a network it would have to throw away.",
            algo: "Guard in SwitchParentage.execute\n  pre_ploidy ← { leaf: subgenome_count(leaf) }\n  … disconnect, reattach, clean …\n  if not ploidy_preserved(net, pre_ploidy):\n      revert to undo snapshot   ▷ no-op, not an illegal net",
            highlight: "if not ploidy_preserved",
            layout: layoutTrue,
            ploidy: true,
            scores: { current: SCORE.start.sum, proposed: SCORE.truth.sum, verdict: "—" },
            legend: "network",
            titlebar: "Species network · proposed",
            mode: "π unchanged",
        },
        {
            id: "mul",
            kicker: "Scoring · MUL",
            title: "Unroll the network into a MUL tree",
            body: "Before we can count extra lineages we expand H1: the clade {x, y, z} is copied once per parent. Subgenome A hangs off a; subgenome B now hangs off b. On the start network, B was hanging off o instead.",
            algo: "Allop_MUL.to_mul(Ψ)\n  for each reticulation v:\n    duplicate the descendant subtree\n    attach one copy to each parent of v\n  result is an ordinary tree with repeated taxa",
            highlight: "duplicate the descendant subtree",
            layout: layoutMulTrue,
            ploidy: false,
            scores: { current: SCORE.start.sum, proposed: SCORE.truth.sum, verdict: "—" },
            legend: "mul",
            titlebar: "MUL tree · proposed",
            mode: "A from a, B from b",
        },
        {
            id: "xl",
            kicker: "Scoring · extra lineages",
            title: "Map GT1 and count XL",
            body: `GT1 is identical to the true MUL, so every coalescence sits on the species edge that allows it: XL = 0. Against the start MUL the cluster {b, xB, yB, zB} has to travel through the root — that is ${SCORE.start.GT1} extra lineages on this locus alone.`,
            algo: "XL(T, T') = Σ_edges (lineages_bottom − 1 − coalescences)\n\nGT1 vs start MUL :  " + SCORE.start.GT1 + "\nGT1 vs proposed    :  " + SCORE.truth.GT1 + "\n\nConcordant gene tree, wrong parentage → wasted deep coalescences.",
            highlight: "lineages_bottom − 1 − coalescences",
            layout: layoutMulTrue,
            ploidy: false,
            hotEdges: ["M2->b", "M2->N4B", "M1->M2"],
            scores: { current: SCORE.start.sum, proposed: SCORE.truth.sum, verdict: "—" },
            legend: "mul",
            titlebar: "MUL tree · proposed · GT1",
            mode: `XL(GT1) = ${SCORE.truth.GT1}`,
        },
        {
            id: "sum",
            kicker: "Scoring · sum",
            title: "Add the three loci",
            body: `The scorer takes the minimum XL over allele maps, then sums gene trees. Start: ${SCORE.start.GT1} + ${SCORE.start.GT2} + ${SCORE.start.GT3} = ${SCORE.start.sum}. Proposed: ${SCORE.truth.GT1} + ${SCORE.truth.GT2} + ${SCORE.truth.GT3} = ${SCORE.truth.sum}. GT2 and GT3 still pay a little ILS on the B subgenome; that is why the truth is 2, not 0.`,
            algo: `score(Ψ) = Σ_g min_f XL(g, MUL(Ψ), f)\n\n          GT1   GT2   GT3   Σ\nstart      ${SCORE.start.GT1}     ${SCORE.start.GT2}     ${SCORE.start.GT3}    ${SCORE.start.sum}\nproposed   ${SCORE.truth.GT1}     ${SCORE.truth.GT2}     ${SCORE.truth.GT3}    ${SCORE.truth.sum}`,
            highlight: "score(Ψ) = Σ_g min_f XL",
            layout: layoutTrue,
            ploidy: false,
            scores: { current: SCORE.start.sum, proposed: SCORE.truth.sum, verdict: "—" },
            legend: "network",
            titlebar: "Species network · proposed",
            mode: `Σ XL = ${SCORE.truth.sum}`,
        },
        {
            id: "search",
            kicker: "Search iteration",
            title: "Hill climbing accepts the move",
            body: `Parsimony is minimized, so the Model likelihood is −XL. Current −(${SCORE.start.sum}) vs proposed −(${SCORE.truth.sum}): the difference is negative, and Infer_MP_Allop_Kernel commits SwitchParentage. A later move is not required here — this single parentage switch is already the Scenario D network.`,
            algo: `HillClimbing.generate_next(SwitchParentage)\n  if  XL_current − XL_proposed  <  0:\n      commit(move)     ▷ ${SCORE.start.sum} → ${SCORE.truth.sum}\n  else:\n      revert(move)\n\nAccept. New current network is Scenario D.`,
            highlight: "commit(move)",
            layout: layoutTrue,
            ploidy: false,
            scores: { current: SCORE.start.sum, proposed: SCORE.truth.sum, verdict: "accept" },
            legend: "network",
            titlebar: "Species network · accepted",
            mode: "commit",
        },
        {
            id: "recap",
            kicker: "Recap",
            title: "One legal move, a better score",
            body: "That is the theoretical claim in software form: SRPP can change parentage without leaving the valid-ploidy slice of network space, and the MDC scorer can tell that the new parents fit the gene trees. PhyNetPy's SwitchParentage is this algorithm, including the ploidy-preservation guard.",
            algo: "Properties (MP-Allop-2 paper)\n  • ploidy of every leaf is invariant\n  • every valid network is reachable\n  • every move is invertible\n  • CalculatePloidy is O(|V| + |E|)",
            highlight: "ploidy of every leaf is invariant",
            layout: layoutTrue,
            ploidy: true,
            scores: { current: SCORE.truth.sum, proposed: SCORE.truth.sum, verdict: "accept" },
            legend: "network",
            titlebar: "Species network · Scenario D",
            mode: "done",
        },
    ];

    /* ---------- SVG renderer ---------- */

    const svg = document.getElementById("net-svg");
    const els = {
        kicker: document.getElementById("step-kicker"),
        title: document.getElementById("step-title"),
        body: document.getElementById("step-body"),
        algo: document.getElementById("algo"),
        board: document.getElementById("scoreboard"),
        current: document.getElementById("score-current"),
        proposed: document.getElementById("score-proposed"),
        verdict: document.getElementById("score-verdict"),
        decision: document.getElementById("score-decision"),
        windowTitle: document.getElementById("window-title"),
        windowMode: document.getElementById("window-mode"),
        legend: document.getElementById("legend"),
        fill: document.getElementById("scrubber-fill"),
        dots: document.getElementById("step-dots"),
        play: document.getElementById("btn-play"),
        prev: document.getElementById("btn-prev"),
        next: document.getElementById("btn-next"),
        reset: document.getElementById("btn-reset"),
        proposedCol: null,
    };

    function svgEl(name, attrs) {
        const el = document.createElementNS(SVG_NS, name);
        Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
        return el;
    }

    function edgeClass(e, step) {
        const classes = ["edge"];
        if (e.kind === "retic") classes.push("retic");
        if (e.kind === "ghost") classes.push("ghost");
        if (step.selectEdges && step.selectEdges.includes(e.id)) classes.push("selected");
        if (step.freshEdges && step.freshEdges.includes(e.id)) classes.push("fresh");
        if (e.kind === "ghost") classes.push("doomed");
        if (step.hotEdges && step.hotEdges.includes(e.id)) classes.push("hot");
        return classes.join(" ");
    }

    function nodeClass(n, step) {
        const classes = ["node-ring"];
        if (n.kind === "retic") classes.push("retic");
        if (n.kind === "leaf") {
            classes.push("leaf");
            classes.push((LEAF_META[n.label] || {}).kind || "diploid");
        }
        if (step.selectNodes && step.selectNodes.includes(n.id)) classes.push("selected");
        if (step.underNodes && step.underNodes.includes(n.id)) classes.push("under");
        return classes.join(" ");
    }

    function drawGraph(g, step) {
        svg.replaceChildren();
        const defs = svgEl("defs", {});
        defs.innerHTML = `
            <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b"/>
            </marker>`;
        svg.appendChild(defs);

        const edgeLayer = svgEl("g", { id: "edges" });
        const nodeLayer = svgEl("g", { id: "nodes" });

        g.edges.forEach((e) => {
            const a = g.nodes[e.src];
            const b = g.nodes[e.dest];
            if (!a || !b) return;
            const path = svgEl("path", {
                d: `M ${a.x} ${a.y} L ${b.x} ${b.y}`,
                class: edgeClass(e, step),
                "data-id": e.id,
            });
            edgeLayer.appendChild(path);
        });

        Object.values(g.nodes).forEach((n) => {
            if (n.kind === "ghost") return;
            const gNode = svgEl("g", { transform: `translate(${n.x},${n.y})`, "data-id": n.id });
            const r = n.kind === "leaf" ? 16 : n.kind === "retic" ? 13 : 9;
            gNode.appendChild(svgEl("circle", { r, class: nodeClass(n, step) }));
            if (n.kind === "retic") {
                gNode.appendChild(svgEl("circle", { r: 6, class: "node-ring retic", "stroke-width": "1.5" }));
            }
            const label = n.kind === "leaf" || n.label === "R" || n.label === "H1" || (n.label && n.label.length <= 3 && n.label !== "");
            if (n.kind === "leaf") {
                gNode.appendChild(svgEl("text", { class: "node-label" })).textContent = n.label;
            } else if (n.label) {
                const t = svgEl("text", { class: "node-label internal", y: n.kind === "root" || n.kind === "retic" ? 0 : 0 });
                t.textContent = n.label;
                gNode.appendChild(t);
            }
            if (step.ploidy && typeof n.p === "number") {
                const bx = n.kind === "leaf" ? 18 : 14;
                const by = n.kind === "leaf" ? -18 : -16;
                const bg = svgEl("rect", {
                    x: bx - 9, y: by - 8, width: 18, height: 14,
                    class: `ploidy-bg${step.underNodes && step.underNodes.includes(n.id) ? " warn" : ""}`,
                });
                gNode.appendChild(bg);
                const pt = svgEl("text", { class: "ploidy-badge", x: bx, y: by });
                pt.textContent = n.p;
                gNode.appendChild(pt);
            }
            nodeLayer.appendChild(gNode);
        });

        svg.appendChild(edgeLayer);
        svg.appendChild(nodeLayer);
    }

    function tweenGraph(from, to, step, done) {
        const start = performance.now();
        const ids = new Set([...Object.keys(from.nodes), ...Object.keys(to.nodes)]);
        const tick = (now) => {
            const t = Math.min(1, (now - start) / TWEEN_MS);
            const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            const nodes = [];
            ids.forEach((id) => {
                const a = from.nodes[id];
                const b = to.nodes[id];
                if (a && b) {
                    nodes.push({ ...b, x: a.x + (b.x - a.x) * ease, y: a.y + (b.y - a.y) * ease });
                } else if (b) {
                    nodes.push({ ...b });
                }
            });
            drawGraph({ nodes: Object.fromEntries(nodes.map((n) => [n.id, n])), edges: to.edges }, step);
            if (t < 1) requestAnimationFrame(tick);
            else done();
        };
        requestAnimationFrame(tick);
    }

    function paintAlgo(text, highlight) {
        if (!highlight) {
            els.algo.textContent = text;
            return;
        }
        const escaped = text.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
        const hl = highlight.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
        els.algo.innerHTML = escaped.replace(hl, `<span class="hl">${hl}</span>`);
    }

    function paintScores(s) {
        if (!s) {
            els.board.hidden = true;
            return;
        }
        els.board.hidden = false;
        els.current.textContent = s.current;
        els.proposed.textContent = s.proposed;
        const propCol = els.proposed.parentElement;
        propCol.classList.toggle("better", s.proposed !== "—" && Number(s.proposed) < Number(s.current));
        els.decision.classList.toggle("accept", s.verdict === "accept");
        els.verdict.textContent = s.verdict === "accept" ? "accept" : s.verdict;
    }

    function paintLegend(kind) {
        if (kind === "mul") {
            els.legend.innerHTML = `
                <span><i class="tetra"></i> subgenome A / B copy</span>
                <span><i class="diploid"></i> diploid tip</span>
                <span>MUL = network with H1 expanded</span>`;
            return;
        }
        els.legend.innerHTML = `
            <span><i></i> tree edge</span>
            <span><i class="retic"></i> reticulation</span>
            <span><i class="diploid"></i> diploid 2n</span>
            <span><i class="tetra"></i> tetraploid 4n</span>`;
    }

    /* ---------- player ---------- */

    let index = 0;
    let playing = false;
    let timer = null;
    let currentGraph = layoutTrue();

    function go(to, { animate = true } = {}) {
        index = (to + STEPS.length) % STEPS.length;
        const step = STEPS[index];
        const nextGraph = step.layout();

        els.kicker.textContent = `Step ${index + 1} / ${STEPS.length} · ${step.kicker}`;
        els.title.textContent = step.title;
        els.body.textContent = step.body;
        paintAlgo(step.algo, step.highlight);
        paintScores(step.scores);
        els.windowTitle.textContent = step.titlebar;
        els.windowMode.textContent = step.mode;
        paintLegend(step.legend);
        els.fill.style.width = `${((index + 1) / STEPS.length) * 100}%`;
        [...els.dots.children].forEach((li, i) => {
            const btn = li.firstChild;
            btn.classList.toggle("active", i === index);
            btn.classList.toggle("done", i < index);
        });

        if (animate) {
            tweenGraph(currentGraph, nextGraph, step, () => { currentGraph = nextGraph; });
        } else {
            currentGraph = nextGraph;
            drawGraph(nextGraph, step);
        }
        if (location.hash !== `#${index + 1}`) {
            history.replaceState(null, "", `#${index + 1}`);
        }
    }

    function play() {
        playing = true;
        els.play.textContent = "Pause";
        els.play.setAttribute("aria-pressed", "true");
        timer = setInterval(() => {
            if (index >= STEPS.length - 1) {
                stop();
                return;
            }
            go(index + 1);
        }, PLAY_MS);
    }

    function stop() {
        playing = false;
        els.play.textContent = "Play";
        els.play.setAttribute("aria-pressed", "false");
        if (timer) clearInterval(timer);
        timer = null;
    }

    STEPS.forEach((step, i) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.title = step.title;
        btn.addEventListener("click", () => { stop(); go(i); });
        li.appendChild(btn);
        els.dots.appendChild(li);
    });

    els.play.addEventListener("click", () => (playing ? stop() : play()));
    els.prev.addEventListener("click", () => { stop(); go(index - 1); });
    els.next.addEventListener("click", () => { stop(); go(index + 1); });
    els.reset.addEventListener("click", () => { stop(); go(0, { animate: false }); });

    document.addEventListener("keydown", (ev) => {
        if (ev.key === "ArrowRight") { stop(); go(index + 1); }
        if (ev.key === "ArrowLeft") { stop(); go(index - 1); }
        if (ev.key === " ") {
            ev.preventDefault();
            playing ? stop() : play();
        }
    });

    const startAt = Math.max(0, parseInt(location.hash.slice(1), 10) - 1) || 0;
    go(Number.isFinite(startAt) ? startAt : 0, { animate: false });

    if (SCORE.start.sum !== 9 || SCORE.truth.sum !== 2) {
        console.error("XL self-check failed", SCORE);
    }
})();
