CLASSIC_REFINEMENT = {
    "M8541": "iPod Classic (1st generation)",
    "A1019": "iPod Classic (2nd generation)",
    "A1040": "iPod Classic (3rd generation)",
    "A1059": "iPod Classic (4th generation)",
    "A1099": "iPod Classic U2 Edition (4th generation)",
    "A1136": "iPod Classic (5th generation)",
    "A1238": "iPod Classic (6th generation)",
}


def get_refined_name(device):
    """
    Returns cleaned / normalized device name
    """

    model_numbers = device.model or []

    for model in model_numbers:
        if model in CLASSIC_REFINEMENT:
            return CLASSIC_REFINEMENT[model]

    return device.name