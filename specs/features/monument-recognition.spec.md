# Feature Spec: Monument Recognition

## Description

Allows users to identify monuments by uploading or taking a photo.

## Scenarios

### Scenario 1: Successful Recognition

- **Given** the user is on the recognition page
- **When** the user uploads a clear image of a known monument
- **Then** the system should display the monument's name and details

### Scenario 2: Unrecognized Monument

- **Given** the user is on the recognition page
- **When** the user uploads an image of an unknown object
- **Then** the system should inform the user that the monument could not be identified
