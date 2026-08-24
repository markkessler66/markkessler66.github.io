# PhyNetPy Benchmark Harness

Every performance figure quoted on the portfolio and résumé is produced by the scripts in this
directory. They are copied here verbatim from `scripts/` in the
[PhyNetPy repository](https://github.com/NakhlehLab/PhyNetPy) so the claims can be audited without
cloning the library.

## Environment

| | |
|---|---|
| Library | PhyNetPy 0.6.0 |
| Runtime | CPython 3.14.2, NumPy 2.3.5 |
| Hardware | AMD Ryzen (Zen 4), Windows 11 |
| Baselines | NetworkX, SciPy, and PhyNetPy's own pure-Python reference paths |

## Scripts

| Script | Measures |
|---|---|
| `portfolio_benchmarks.py` | Substitution-model transition matrices vs. `scipy.linalg.expm`; Cython graph core vs. NetworkX; MPL scoring; network distance metrics |
| `portfolio_benchmarks_cython.py` | End-to-end `score()` with the Cython kernel forced on vs. off; retained-memory comparison against NetworkX |
| `portfolio_benchmarks_kernel.py` | The pseudo-likelihood DP kernel in isolation, separating the compiled inner loop from Python-side setup cost |

Each writes a `.json` sibling containing the raw measurements, also committed here.

## Method

- Every timing runs one warm-up call, then reports the **median of 3–5 repeats** of a tight loop
  measured with `time.perf_counter`.
- Memory is measured with `tracemalloc` and reports memory **retained** after construction, with
  builder temporaries collected — peak measurements would have counted scratch allocations and
  unfairly flattered PhyNetPy.
- **Every optimized path is asserted against its reference implementation in the same process.**
  The Cython pseudo-likelihood kernel agrees with the pure-Python DP exactly (`0.0` absolute
  difference); closed-form transition matrices agree with SciPy to ~1e-16. A speedup that changes
  the answer is a bug, not a speedup.

## Reproducing

The scripts require an installed PhyNetPy 0.6.0 with its Cython extensions built:

```bash
pip install phynetpy
python portfolio_benchmarks.py
python portfolio_benchmarks_cython.py
python portfolio_benchmarks_kernel.py
```

## Headline results

| Measurement | Result |
|---|---|
| Pseudo-likelihood DP kernel, Cython vs. pure Python | 4.2× at 6 taxa rising to **9.2× at 24 taxa**, bit-identical scores |
| Transition matrices vs. `scipy.linalg.expm` | **8.6×–19.5×** across eight substitution models |
| In-edge lookup vs. NetworkX | **10.9× faster** (0.15 µs vs. 1.65 µs) |
| Leaf enumeration vs. NetworkX | **3.8× faster** |
| Topological sort vs. NetworkX | **1.5× slower** — deliberate trade-off, not a hot path |
| Retained memory vs. NetworkX | **1.9× heavier** — ~1 KB/node buys O(1) domain queries |

The last two rows are losses. They are reported because a benchmark suite that only publishes wins
isn't a benchmark suite.
