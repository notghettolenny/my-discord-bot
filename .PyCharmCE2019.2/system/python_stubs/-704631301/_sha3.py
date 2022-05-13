# encoding: utf-8
# module _sha3
# from (built-in)
# by generator 1.147
# no doc
# no imports

# Variables with simple values

implementation = 'generic 64-bit optimized implementation (lane complementing, all rounds unrolled)'

keccakopt = 64

# no functions
# classes

class sha3_224(object):
    """
    sha3_224([data]) -> SHA3 object
    
    Return a new SHA3 hash object with a hashbit length of 28 bytes.
    """
    def copy(self, *args, **kwargs): # real signature unknown
        """ Return a copy of the hash object. """
        pass

    def digest(self, *args, **kwargs): # real signature unknown
        """ Return the digest value as a bytes object. """
        pass

    def hexdigest(self, *args, **kwargs): # real signature unknown
        """ Return the digest value as a string of hexadecimal digits. """
        pass

    def update(self, *args, **kwargs): # real signature unknown
        """ Update this hash object's state with the provided bytes-like object. """
        pass

    def __init__(self, data=None): # real signature unknown; restored from __doc__
        pass

    @staticmethod # known case of __new__
    def __new__(*args, **kwargs): # real signature unknown
        """ Create and return a new object.  See help(type) for accurate signature. """
        pass

    block_size = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    digest_size = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    name = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _capacity_bits = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _rate_bits = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _suffix = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default



class sha3_256(object):
    """
    sha3_256([data]) -> SHA3 object
    
    Return a new SHA3 hash object with a hashbit length of 32 bytes.
    """
    def copy(self, *args, **kwargs): # real signature unknown
        """ Return a copy of the hash object. """
        pass

    def digest(self, *args, **kwargs): # real signature unknown
        """ Return the digest value as a bytes object. """
        pass

    def hexdigest(self, *args, **kwargs): # real signature unknown
        """ Return the digest value as a string of hexadecimal digits. """
        pass

    def update(self, *args, **kwargs): # real signature unknown
        """ Update this hash object's state with the provided bytes-like object. """
        pass

    def __init__(self, data=None): # real signature unknown; restored from __doc__
        pass

    @staticmethod # known case of __new__
    def __new__(*args, **kwargs): # real signature unknown
        """ Create and return a new object.  See help(type) for accurate signature. """
        pass

    block_size = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    digest_size = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    name = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _capacity_bits = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _rate_bits = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _suffix = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default



class sha3_384(object):
    """
    sha3_384([data]) -> SHA3 object
    
    Return a new SHA3 hash object with a hashbit length of 48 bytes.
    """
    def copy(self, *args, **kwargs): # real signature unknown
        """ Return a copy of the hash object. """
        pass

    def digest(self, *args, **kwargs): # real signature unknown
        """ Return the digest value as a bytes object. """
        pass

    def hexdigest(self, *args, **kwargs): # real signature unknown
        """ Return the digest value as a string of hexadecimal digits. """
        pass

    def update(self, *args, **kwargs): # real signature unknown
        """ Update this hash object's state with the provided bytes-like object. """
        pass

    def __init__(self, data=None): # real signature unknown; restored from __doc__
        pass

    @staticmethod # known case of __new__
    def __new__(*args, **kwargs): # real signature unknown
        """ Create and return a new object.  See help(type) for accurate signature. """
        pass

    block_size = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    digest_size = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    name = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _capacity_bits = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _rate_bits = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _suffix = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default



class sha3_512(object):
    """
    sha3_512([data]) -> SHA3 object
    
    Return a new SHA3 hash object with a hashbit length of 64 bytes.
    """
    def copy(self, *args, **kwargs): # real signature unknown
        """ Return a copy of the hash object. """
        pass

    def digest(self, *args, **kwargs): # real signature unknown
        """ Return the digest value as a bytes object. """
        pass

    def hexdigest(self, *args, **kwargs): # real signature unknown
        """ Return the digest value as a string of hexadecimal digits. """
        pass

    def update(self, *args, **kwargs): # real signature unknown
        """ Update this hash object's state with the provided bytes-like object. """
        pass

    def __init__(self, data=None): # real signature unknown; restored from __doc__
        pass

    @staticmethod # known case of __new__
    def __new__(*args, **kwargs): # real signature unknown
        """ Create and return a new object.  See help(type) for accurate signature. """
        pass

    block_size = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    digest_size = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    name = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _capacity_bits = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _rate_bits = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _suffix = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default



class shake_128(object):
    """
    shake_128([data]) -> SHAKE object
    
    Return a new SHAKE hash object.
    """
    def copy(self, *args, **kwargs): # real signature unknown
        """ Return a copy of the hash object. """
        pass

    def digest(self, *args, **kwargs): # real signature unknown
        """ Return the digest value as a bytes object. """
        pass

    def hexdigest(self, *args, **kwargs): # real signature unknown
        """ Return the digest value as a string of hexadecimal digits. """
        pass

    def update(self, *args, **kwargs): # real signature unknown
        """ Update this hash object's state with the provided bytes-like object. """
        pass

    def __init__(self, data=None): # real signature unknown; restored from __doc__
        pass

    @staticmethod # known case of __new__
    def __new__(*args, **kwargs): # real signature unknown
        """ Create and return a new object.  See help(type) for accurate signature. """
        pass

    block_size = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    digest_size = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    name = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _capacity_bits = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _rate_bits = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _suffix = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default



class shake_256(object):
    """
    shake_256([data]) -> SHAKE object
    
    Return a new SHAKE hash object.
    """
    def copy(self, *args, **kwargs): # real signature unknown
        """ Return a copy of the hash object. """
        pass

    def digest(self, *args, **kwargs): # real signature unknown
        """ Return the digest value as a bytes object. """
        pass

    def hexdigest(self, *args, **kwargs): # real signature unknown
        """ Return the digest value as a string of hexadecimal digits. """
        pass

    def update(self, *args, **kwargs): # real signature unknown
        """ Update this hash object's state with the provided bytes-like object. """
        pass

    def __init__(self, data=None): # real signature unknown; restored from __doc__
        pass

    @staticmethod # known case of __new__
    def __new__(*args, **kwargs): # real signature unknown
        """ Create and return a new object.  See help(type) for accurate signature. """
        pass

    block_size = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    digest_size = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    name = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _capacity_bits = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _rate_bits = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default

    _suffix = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default



class __loader__(object):
    """
    Meta path import for built-in modules.
    
        All methods are either class or static methods to avoid the need to
        instantiate the class.
    """
    @classmethod
    def create_module(cls, *args, **kwargs): # real signature unknown
        """ Create a built-in module """
        pass

    @classmethod
    def exec_module(cls, *args, **kwargs): # real signature unknown
        """ Exec a built-in module """
        pass

    @classmethod
    def find_module(cls, *args, **kwargs): # real signature unknown
        """
        Find the built-in module.
        
                If 'path' is ever specified then the search is considered a failure.
        
                This method is deprecated.  Use find_spec() instead.
        """
        pass

    @classmethod
    def find_spec(cls, *args, **kwargs): # real signature unknown
        pass

    @classmethod
    def get_code(cls, *args, **kwargs): # real signature unknown
        """ Return None as built-in modules do not have code objects. """
        pass

    @classmethod
    def get_source(cls, *args, **kwargs): # real signature unknown
        """ Return None as built-in modules do not have source code. """
        pass

    @classmethod
    def is_package(cls, *args, **kwargs): # real signature unknown
        """ Return False as built-in modules are never packages. """
        pass

    @classmethod
    def load_module(cls, *args, **kwargs): # real signature unknown
        """
        Load the specified module into sys.modules and return it.
        
            This method is deprecated.  Use loader.exec_module instead.
        """
        pass

    def module_repr(module): # reliably restored by inspect
        """
        Return repr for the module.
        
                The method is deprecated.  The import machinery does the job itself.
        """
        pass

    def __init__(self, *args, **kwargs): # real signature unknown
        pass

    __weakref__ = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    """list of weak references to the object (if defined)"""


    __dict__ = None # (!) real value is "mappingproxy({'__module__': '_frozen_importlib', '__doc__': 'Meta path import for built-in modules.\\n\\n    All methods are either class or static methods to avoid the need to\\n    instantiate the class.\\n\\n    ', 'module_repr': <staticmethod object at 0x00000202A31A3490>, 'find_spec': <classmethod object at 0x00000202A31A34C0>, 'find_module': <classmethod object at 0x00000202A31A34F0>, 'create_module': <classmethod object at 0x00000202A31A3520>, 'exec_module': <classmethod object at 0x00000202A31A3550>, 'get_code': <classmethod object at 0x00000202A31A35E0>, 'get_source': <classmethod object at 0x00000202A31A3670>, 'is_package': <classmethod object at 0x00000202A31A3700>, 'load_module': <classmethod object at 0x00000202A31A3730>, '__dict__': <attribute '__dict__' of 'BuiltinImporter' objects>, '__weakref__': <attribute '__weakref__' of 'BuiltinImporter' objects>})"


# variables with complex values

__spec__ = None # (!) real value is "ModuleSpec(name='_sha3', loader=<class '_frozen_importlib.BuiltinImporter'>, origin='built-in')"

