# encoding: utf-8
# module _codecs_jp
# from (built-in)
# by generator 1.147
# no doc
# no imports

# functions

def getcodec(*args, **kwargs): # real signature unknown
    pass

# classes

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

__map_cp932ext = None # (!) real value is '<capsule object "multibytecodec.__map_*" at 0x00000202A3953240>'

__map_jisx0208 = None # (!) real value is '<capsule object "multibytecodec.__map_*" at 0x00000202A3953FC0>'

__map_jisx0212 = None # (!) real value is '<capsule object "multibytecodec.__map_*" at 0x00000202A3953ED0>'

__map_jisx0213_1_bmp = None # (!) real value is '<capsule object "multibytecodec.__map_*" at 0x00000202A3953150>'

__map_jisx0213_1_emp = None # (!) real value is '<capsule object "multibytecodec.__map_*" at 0x00000202A3953780>'

__map_jisx0213_2_bmp = None # (!) real value is '<capsule object "multibytecodec.__map_*" at 0x00000202A3953210>'

__map_jisx0213_2_emp = None # (!) real value is '<capsule object "multibytecodec.__map_*" at 0x00000202A39536C0>'

__map_jisx0213_bmp = None # (!) real value is '<capsule object "multibytecodec.__map_*" at 0x00000202A39531E0>'

__map_jisx0213_emp = None # (!) real value is '<capsule object "multibytecodec.__map_*" at 0x00000202A39537B0>'

__map_jisx0213_pair = None # (!) real value is '<capsule object "multibytecodec.__map_*" at 0x00000202A3953750>'

__map_jisxcommon = None # (!) real value is '<capsule object "multibytecodec.__map_*" at 0x00000202A3953AE0>'

__spec__ = None # (!) real value is "ModuleSpec(name='_codecs_jp', loader=<class '_frozen_importlib.BuiltinImporter'>, origin='built-in')"

