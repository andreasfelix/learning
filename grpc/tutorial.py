# Generated by the protocol buffer compiler.  DO NOT EDIT!
# sources: addressbook.proto
# plugin: python-betterproto
from dataclasses import dataclass
from typing import List

import betterproto


class PersonPhoneType(betterproto.Enum):
    MOBILE = 0
    HOME = 1
    WORK = 2


@dataclass
class Person(betterproto.Message):
    name: str = betterproto.string_field(1)
    id: int = betterproto.int32_field(2)
    email: str = betterproto.string_field(3)
    phones: List["PersonPhoneNumber"] = betterproto.message_field(4)


@dataclass
class PersonPhoneNumber(betterproto.Message):
    number: str = betterproto.string_field(1)
    type: "PersonPhoneType" = betterproto.enum_field(2)


@dataclass
class AddressBook(betterproto.Message):
    people: List["Person"] = betterproto.message_field(1)
