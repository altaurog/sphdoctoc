sphdoctoc
===========

Introduction
--------------

This little Google Chrome extension creates a tree-view navigation popup
for code documentation generated with Sphinx_.  It is intended to make
getting around the docs a whole lot easier.

.. _Sphinx: http://sphinx.pocoo.org

Scope
------
sphdoctoc is now enabled for the online `Matplotlib api docs`_ the `Python docs`_,
the fabric_ docs, the Sqlalchemy_ docs and documentation hosted at `Read the Docs`_.

.. _Matplotlib api docs: http://matplotlib.org/api/
.. _Python docs: http://docs.python.org/
.. _fabric: http://docs.fabfile.org/
.. _Sqlalchemy: http://docs.sqlalchemy.org/
.. _Read the Docs: https://readthedocs.io

Please `open an issue`_ if there are other sites you'd like included.

.. _open an issue: https://github.com/altaurog/sphdoctoc/issues

Installation
----------------
To install, just click here_.  Make sure you are using Google Chrome.

.. _here: https://bitbucket.org/altaurog/sphdoctoc/downloads/sphdoctoc.crx

Version History
----------------

:29 Dec 2011:
   Version 1.0, initial release

:2 Jan 2012:
   Version 1.1, added module index drop-down

:15 Jan 2013:
    Version 1.2, extended permissions to more domains

:27 Feb 2013:
    Version 1.3, update chrome manifest to version 2

:1 Apr 2014:
    Version 1.4, allow https on all permitted sites

:14 Nov 2016:
    Version 1.5

    * move from readthedocs.org to readthedocs.io
    * fix "Modules" drop-down menu
    * hide "Modules" drop-down if no index available
    * enable for docs.sqlalchemy.org

:18 Nov 2016:
    Version 1.6, adjustable font size


License
---------
| Copyright (c) 2011 - 2016, Aryeh Leib Taurog.
| All rights reserved.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
