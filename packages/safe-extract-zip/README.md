# Safe extract-zip snapshot

This private workspace package carries the upstream `extract-zip` implementation
from commit `e0c19dc9875f7d07c9a2fa33b03ae0c49504b4d2`, with the symlink
containment fix proposed in [upstream PR 162](https://github.com/max-mapper/extract-zip/pull/162).
It prevents both out-of-directory symlink targets and writes through symlinks
already present at an extraction destination.

The source is BSD-2-Clause licensed; see `LICENSE`. Keep this snapshot aligned
with upstream and remove the override after a patched npm release is available.
