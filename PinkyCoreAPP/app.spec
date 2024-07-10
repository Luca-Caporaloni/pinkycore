# my_app.spec
# -*- mode: python ; coding: utf-8 -*-

block_cipher = None

a = Analysis(['main.py'],
             pathex=['.'],
             binaries=[],
             datas=[('web/recurses/images/logo/logo-noBG.ico', '.'),
                    ('web/scripts.js', '.'),
                    ('web/games.html', '.'),
                    ('web/equipo.html', '.'),
                    ('web/index.html', '.'),
                    ('web/P&P.html', '.'),
                    ('web/inicio.html', '.'),
                    ('web/P&Pstyle.css', '.'),
                    ('web/team.css', '.'),
                    ('web/styles.css', '.'), 
                    ('web/recurses/', 'recurses'),
                    ('web/', 'web')
                    ],
             hiddenimports=[],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False,)

pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)

exe = EXE(pyz,
          a.scripts,
          a.binaries,
          a.zipfiles,
          a.datas,
          [],
          exclude_binaries=True,
          name='PinkyCore',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          upx_exclude=[],
          runtime_tmpdir=None,
          console=False,
          icon='web/recurses/images/logo/logo-noBG.ico')

coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               upx_exclude=[],
               name='PinkyCore')