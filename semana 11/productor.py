
#Texto libre
# Productor.py

import stomp 
import argparse
import json 
from decimal import Decimal, InvalidOperation
import xml.etree.ElementTree as ET

DESTINO = '/queue/pedidos'

def construir_mensaje(formato: str, pedido: dict, texto: str) -> tuple[str, str]:
    if formato == 'texto':